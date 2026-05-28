import prisma from '../lib/prisma.js';
import {
  emojiParamsSchema,
  upsertEmojiSchema,
} from '../schemas/emoji.schema.js';
import asyncHandler from '../utils/asyncHandler.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

// GET /studies/:studyId/emojis
export const getAllEmojis = asyncHandler(async (req, res) => {
  const { studyId } = emojiParamsSchema.parse(req.params);

  const study = await prisma.study.findUnique({
    where: { id: studyId },
  });

  if (!study) throw new NotFoundError(`해당 studyId를 찾을 수 없습니다.`);

  const newEmojis = await prisma.emoji.findMany({
    where: { studyId: studyId },
    orderBy: { count: 'desc' },
  });

  res.json({
    success: true,
    data: newEmojis,
  });
});

// PATCH /studies/:studyId/emojis
export const upsertEmoji = asyncHandler(async (req, res) => {
  const { studyId } = emojiParamsSchema.parse(req.params);
  const data = upsertEmojiSchema.parse(req.body);
  const { emoji } = data;

  const newEmoji = await prisma.emoji.upsert({
    where: {
      // unique constraint
      studyId_emoji: {
        emoji,
        studyId,
      },
    },
    update: { count: { increment: 1 } },
    create: {
      emoji: emoji,
      count: 1,
      studyId,
    },
  });

  const isCreated =
    newEmoji.createdAt.getTime() === newEmoji.updatedAt.getTime();
  const statusCode = isCreated ? 201 : 200;

  res.status(statusCode).json({ success: true, data: newEmoji });
});

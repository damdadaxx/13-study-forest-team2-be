import prisma from '../lib/prisma.js';
import { upsertEmojiSchema } from '../schemas/emoji.schema.js';
import asyncHandler from '../utils/asyncHandler.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

// 스터디 ID 유효성 체크
const isValidStudyId = async (studyId) => {
  const parsedStudyId = parseInt(studyId);

  if (isNaN(parsedStudyId)) {
    throw new ValidationError('스터디 ID는 숫자여야 합니다.', 'BAD_REQUEST');
  }

  const countStudyId = await prisma.emoji.count({
    where: { studyId: parsedStudyId },
  });

  if (countStudyId === 0) {
    throw new NotFoundError('존재하지 않는 스터디입니다.', 'NOT_FOUND');
  }

  return parsedStudyId; // 파싱된 ID
};

// GET /studies/:studyId/emojis
export const getAllEmojis = asyncHandler(async (req, res) => {
  const { studyId } = req.params;

  const parsedStudyId = await isValidStudyId(studyId);

  const newEmojis = await prisma.emoji.findMany({
    where: { studyId: parsedStudyId },
    orderBy: { updatedAt: 'desc' },
  });

  res.json({
    success: true,
    data: newEmojis,
  });
});

// PATCH /studies/:studyId/emojis
export const upsertEmoji = asyncHandler(async (req, res) => {
  const { studyId } = req.params;
  const data = upsertEmojiSchema.parse(req.body);
  const { emoji } = data;

  const parsedStudyId = await isValidStudyId(studyId);

  const newEmoji = await prisma.emoji.upsert({
    where: {
      // unique constraint
      studyId_emoji: {
        emoji,
        studyId: parsedStudyId,
      },
    },
    update: { count: { increment: 1 } },
    create: {
      emoji: emoji,
      count: 1,
      studyId: parsedStudyId,
    },
  });

  res.json({ success: true, data: newEmoji });
});

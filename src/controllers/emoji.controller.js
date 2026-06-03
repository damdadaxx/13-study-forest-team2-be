import prisma from '../lib/prisma.js';
import { emojiParamsSchema, emojiBodySchema } from '../schemas/emoji.schema.js';
import asyncHandler from '../utils/asyncHandler.js';
import { NotFoundError } from '../utils/errors.js';

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

// POST /studies/:studyId/emojis
export const incrementEmoji = asyncHandler(async (req, res) => {
  const { studyId } = emojiParamsSchema.parse(req.params);
  const { emoji } = emojiBodySchema.parse(req.body);

  // 이모지 카운트 업 후 필요 시 생성
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
      studyId,
    },
  });

  const isCreated =
    newEmoji.createdAt.getTime() === newEmoji.updatedAt.getTime();
  const statusCode = isCreated ? 201 : 200;

  res.status(statusCode).json({ success: true, data: newEmoji });
});

// DELETE /studies/:studyId/emojis
export const decrementEmoji = asyncHandler(async (req, res) => {
  const { studyId } = emojiParamsSchema.parse(req.params);
  const { emoji } = emojiBodySchema.parse(req.body);

  // 이모지 카운트 감소 후 필요 시 삭제
  const result = await prisma.$transaction(async (tx) => {
    const targetEmoji = await tx.emoji.findUnique({
      where: {
        studyId_emoji: {
          studyId,
          emoji,
        },
      },
    });

    if (!targetEmoji) {
      throw new NotFoundError('해당 이모지를 찾을 수 없습니다.');
    }

    // 이모지 count가 1이하일 때, 이모지 삭제
    if (targetEmoji.count <= 1) {
      await tx.emoji.delete({
        where: {
          studyId_emoji: {
            studyId,
            emoji,
          },
        },
      });

      return {
        deleted: true,
        message: '이모지가 삭제되었습니다.',
      };
    }

    // 이모지 카운트 다운
    const updatedEmoji = await tx.emoji.update({
      where: {
        studyId_emoji: {
          studyId,
          emoji,
        },
      },
      data: {
        count: {
          decrement: 1,
        },
      },
    });

    return {
      deleted: false,
      message: '이모지 카운트가 감소했습니다.',
      data: updatedEmoji,
    };
  });

  return res.json({
    success: true,
    ...result,
  });
});

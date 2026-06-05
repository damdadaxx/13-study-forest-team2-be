import prisma from '../lib/prisma.js';
import { focusParamsSchema, focusBodySchema } from '../schemas/focus.schema.js';
import asyncHandler from '../utils/asyncHandler.js';
import { NotFoundError } from '../utils/errors.js';

const BASE_DURATION = 1500; // 25분
const BASE_POINT = 3;
const BONUS_DURATION = 600; // 10분

export const createFocus = asyncHandler(async (req, res) => {
  const { studyId } = focusParamsSchema.parse(req.params);
  const { duration } = focusBodySchema.parse(req.body);

  const study = await prisma.study.findUnique({
    where: { id: studyId },
  });

  if (!study) {
    throw new NotFoundError('스터디를 찾을 수 없습니다.');
  }

  let earnedPoint = 0;

  if (duration >= BASE_DURATION) {
    const overtime = duration - BASE_DURATION;
    earnedPoint = BASE_POINT + Math.floor(overtime / BONUS_DURATION);
  }

  const result = await prisma.$transaction(async (tx) => {
    const focusSession = await tx.focusSession.create({
      data: {
        studyId,
        duration,
        earnedPoint,
      },
    });

    const updatedStudy = await tx.study.update({
      where: { id: studyId },
      data: {
        totalPoint: study.totalPoint + earnedPoint,
      },
    });

    return { focusSession, updatedStudy };
  });

  res.status(201).json({
    success: true,
    data: {
      duration: result.focusSession.duration,
      earnedPoint: result.focusSession.earnedPoint,
      totalPoint: result.updatedStudy.totalPoint,
    },
    message: '집중 기록 생성 성공',
  });
});

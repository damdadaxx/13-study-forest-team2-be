import prisma from '../lib/prisma.js';
import asyncHandler from '../utils/asyncHandler.js';
import { NotFoundError } from '../utils/errors.js';
import { getTodayKst, toDateString } from '../utils/date.js';
import {
  checkHabitSchema,
  habitListParamsSchema,
  habitCheckParamsSchema,
  createHabitParamsShema,
  updateHabitParamSchema,
} from '../schemas/habit.schema.js';

// GET /studies/:studyId/habits - 오늘의 습관 목록 + 체크 상태 조회
export const getHabits = asyncHandler(async (req, res) => {
  // params 검증 - studyId 가 양의 정수인지
  const { studyId } = habitListParamsSchema.parse(req.params);
  const today = getTodayKst();

  // 스터디 존재 검증
  const study = await prisma.study.findUnique({ where: { id: studyId } });
  if (!study) {
    throw new NotFoundError('스터디를 찾을 수 없습니다.');
  }

  const habits = await prisma.habit.findMany({
    where: {
      studyId,
      deletedAt: null,
    },
    include: {
      habitRecords: {
        where: {
          date: today,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  const data = {
    date: toDateString(today), // KST 기준 오늘 (YYYY-MM-DD)
    habits: habits.map((habit) => ({
      id: habit.id,
      content: habit.content, // 명세: 필드명 content 그대로
      isChecked: habit.habitRecords[0]?.isChecked ?? false, // 오늘 기록 있으면 그 값, 없으면 false
      createdAt: habit.createdAt,
    })),
  };

  res.json({ success: true, data });
});

// PATCH /studies/:studyId/habits/:habitId/check - 오늘 자 체크 상태 설정
export const toggleHabitCheck = asyncHandler(async (req, res) => {
  // params 검증 - studyId, habitId 가 양의 정수인지
  const { studyId, habitId } = habitCheckParamsSchema.parse(req.params);
  const today = getTodayKst();

  // 바디 검증 - { isChecked: boolean }
  const { isChecked } = checkHabitSchema.parse(req.body);

  // 스터디 존재 검증 ( getHabits 와 동일하게 - 리뷰 피드백 반영 )
  const study = await prisma.study.findUnique({ where: { id: studyId } });
  if (!study) {
    throw new NotFoundError('스터디를 찾을 수 없습니다.');
  }

  // 이 스터디에 속한 활성 습관인지 확인
  const habit = await prisma.habit.findFirst({
    where: { id: habitId, studyId, deletedAt: null },
  });
  if (!habit) {
    throw new NotFoundError('습관을 찾을 수 없거나 이미 종료되었습니다.');
  }

  // 오늘 자 record 를 받은 값으로 설정 (없으면 생성, 있으면 갱신)
  const record = await prisma.habitRecord.upsert({
    where: { habitId_date: { habitId, date: today } },
    update: { isChecked },
    create: { habitId, date: today, isChecked },
  });

  res.json({
    success: true,
    data: {
      id: record.id,
      habitId: record.habitId,
      date: toDateString(record.date),
      isChecked: record.isChecked,
    },
    message: '습관 체크 상태가 업데이트되었습니다.',
  });
});

// POST /studies/:studyId/habits - 습관 생성
export const createHabit = asyncHandler(async (req, res) => {
  const { studyId } = habitListParamsSchema.parse(req.params);
  const { content } = createHabitParamsShema.parse(req.body);

  const study = await prisma.study.findUnique({ where: { id: studyId } });
  if (!study) throw new NotFoundError('스터디를 찾을 수 없습니다.');

  const duplicate = await prisma.habit.findFirst({
    where: { studyId, content, deletedAt: null },
  });
  if (duplicate) {
    return res.status(409).json({
      success: false,
      error: { code: 'DUPLICATE_CONTENT', message: '이미 등록된 습관입니다.' },
    });
  }

  const habit = await prisma.habit.create({
    data: { content, studyId },
  });

  res.status(201).json({
    success: true,
    data: habit,
    message: '습관 생성이 성공적으로 완료됐습니다!',
  });
});

// PATCH /studies/:studyId/habits/:habitId - 습관 이름 수정
export const updateHabit = asyncHandler(async (req, res) => {
  const { studyId, habitId } = habitCheckParamsSchema.parse(req.params);
  const { content } = updateHabitParamSchema.parse(req.body);

  const habit = await prisma.habit.findFirst({
    where: { id: habitId, studyId, deletedAt: null },
  });
  if (!habit) throw new NotFoundError('해당 습관을 찾을 수 없습니다.');

  const duplicate = await prisma.habit.findFirst({
    where: { studyId, content, deletedAt: null, NOT: { id: habitId } },
  });
  if (duplicate) {
    return res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_CONTENT',
        message: '이미 존재하는 습관 이름입니다.',
      },
    });
  }

  const updated = await prisma.habit.update({
    where: { id: habitId },
    data: { content },
  });

  res.json({
    success: true,
    data: updated,
    message:
      '습관 이름이 성공적으로 변경되었습니다. 과거 기록에도 반영되었습니다.',
  });
});

// DELETE /studies/:studyId/habits/:habitId - 습관 종료 (soft delete)
export const deleteHabit = asyncHandler(async (req, res) => {
  const { studyId, habitId } = habitCheckParamsSchema.parse(req.params);

  const habit = await prisma.habit.findFirst({
    where: { id: habitId, studyId, deletedAt: null },
  });
  if (!habit) throw new NotFoundError('해당 습관을 찾을 수 없습니다.');

  await prisma.habit.update({
    where: { id: habitId },
    data: { deletedAt: new Date() },
  });

  res.json({ success: true, message: '습관이 성공적으로 삭제됐습니다.' });
});

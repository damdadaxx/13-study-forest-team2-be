import express from 'express';
import {
  getHabits,
  toggleHabitCheck,
  createHabit,
  updateHabit,
  deleteHabit,
} from '../controllers/habit.controller.js';

const router = express.Router({ mergeParams: true });

// GET /studies/:studyId/habits - 오늘의 습관 목록 조회
router.get('/', getHabits);

// POST /studies/:studyId/habits - 습관 생성
router.post('/', createHabit);

// PATCH /studies/:studyId/habits/:habitId/check - 체크 토글
router.patch('/:habitId/check', toggleHabitCheck);

// PATCH /studies/:studyId/habits/:habitId - 이름 수정
router.patch('/:habitId', updateHabit);

// DELETE /studies/:studyId/habits/:habitId - 종료 (soft delete)
router.delete('/:habitId', deleteHabit);

export default router;

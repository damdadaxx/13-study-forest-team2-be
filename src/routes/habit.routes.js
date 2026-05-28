import express from 'express';
import {
  getHabits,
  toggleHabitCheck,
} from '../controllers/habit.controller.js';

const router = express.Router({ mergeParams: true });

// GET /studies/:studyId/habits - 오늘의 습관 목록 조회
router.get('/', getHabits);

// POST /studies/:studyId/habits - 습관 생성
router.post('/', (req, res) => {
  res.json({ todo: 'POST habits 구현 예정' });
});

// PATCH /studies/:studyId/habits/:habitId/check - 체크 토글
router.patch('/:habitId/check', toggleHabitCheck);

// PATCH /studies/:studyId/habits/:habitId - 이름 수정
router.patch('/:habitId', (req, res) => {
  res.json({ todo: 'PATCH habit name 구현 예정' });
});

// DELETE /studies/:studyId/habits/:habitId - 종료 (soft delete)
router.delete('/:habitId', (req, res) => {
  res.json({ todo: 'DELETE habit 구현 예정' });
});

export default router;

import express from 'express';

const router = express.Router({ mergeParams: true });

// GET /api/v1/studies/{studyId}/habits - 오늘의 습관 목록 조회
router.get('/', (req, res) => {
  res.json({ todo: 'GET habits 구현 예정', studyId: req.params.studyId });
});

// POST /api/v1/studies/{studyId}/habits - 습관 생성
router.post('/', (req, res) => {
  res.json({ todo: 'POST habits 구현 예정' });
});

// PATCH /api/v1/studies/{studyId}/habits/{habitId}/check - 체크 토글
router.patch('/:habitId/check', (req, res) => {
  res.json({ todo: 'PATCH habit check 구현 예정' });
});

// PATCH /api/v1/studies/{studyId}/habits/{habitId} - 이름 수정
router.patch('/:habitId', (req, res) => {
  res.json({ todo: 'PATCH habit name 구현 예정' });
});

// DELETE /api/v1/studies/{studyId}/habits/{habitId} - 종료 (soft delete)
router.delete('/:habitId', (req, res) => {
  res.json({ todo: 'DELETE habit 구현 예정' });
});

export default router;

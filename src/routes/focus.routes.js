import express from 'express';

const router = express.Router();

// GET /focus - 오늘 집중 목록 조회
router.get('/', (req, res) => {
  res.json({ todo: 'GET focus 구현 예정' });
});

// GET /focus/:id - 집중 기록 상세 조회
router.get('/:id', (req, res) => {
  res.json({ todo: 'GET focus detail 구현 예정' });
});

// POST /focus - 집중 기록 생성
router.post('/', (req, res) => {
  res.json({ todo: 'POST focus 구현 예정' });
});

export default router;

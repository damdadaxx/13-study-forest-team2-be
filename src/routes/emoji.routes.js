import express from 'express';
import {
  getAllEmojis,
  incrementEmoji,
  decrementEmoji,
} from '../controllers/emoji.controller.js';

const router = express.Router({ mergeParams: true });

// GET /studies/:studyId/emojis - 이모지 목록 조회
router.get('/', getAllEmojis);
// POST /studies/:studyId/emojis - 이모지 추가 및 count 증가
router.post('/', incrementEmoji);
// DELETE /studies/:studyId/emojis - 이모지 제거 및 count 감소
router.delete('/', decrementEmoji);

export default router;

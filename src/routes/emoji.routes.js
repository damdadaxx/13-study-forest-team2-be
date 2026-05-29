import express from 'express';
import { getAllEmojis, upsertEmoji } from '../controllers/emoji.controller.js';

const router = express.Router({ mergeParams: true });

// GET /studies/:studyId/emojis - 이모지 목록 조회
router.get('/', getAllEmojis);
// PATCH /studies/:studyId/emojis - 이모지 생성 / 카운트 업
router.patch('/', upsertEmoji);

export default router;

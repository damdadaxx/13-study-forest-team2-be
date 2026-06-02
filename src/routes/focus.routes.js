import express from 'express';
import { createFocus } from '../controllers/focus.controller.js';

const router = express.Router();

// params 라우트 작성 방식에 맞춰 :studyId를 직접 선언하였습니다.
// POST /studies/:studyId/focus
router.post('/:studyId/focus', createFocus);

export default router;

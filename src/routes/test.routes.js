import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';

const router = express.Router();

// 핸들러 정상 응답 확인
router.get(
  '/ok',
  asyncHandler(async (req, res) => {
    res.json({ success: true, message: '핸들러가 정상 작동합니다!' });
  }),
);

// 400 커스텀 에러 확인
router.get(
  '/error',
  asyncHandler(async (req, res) => {
    throw new ValidationError('테스트용 잘못된 요청입니다.');
  }),
);

// 404 커스텀 에러 확인
router.get(
  '/not-found-error',
  asyncHandler(async (req, res) => {
    throw new NotFoundError('스터디를 찾을 수 없습니다.');
  }),
);

// 500 예상치 못한 에러 확인
router.get(
  '/server-error',
  asyncHandler(async (req, res) => {
    throw new Error('예상하지 못한 에러');
  }),
);

router.get(
  '/foreign-key-error',
  asyncHandler(async (req, res) => {
    const error = new Error('Foreign key constraint failed');
    error.code = 'P2003';
    throw error;
  }),
);

export default router;

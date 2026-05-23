import express from 'express';
import cors from 'cors';
import asyncHandler from './utils/asyncHandler.js';
import { ValidationError, NotFoundError } from './utils/errors.js';
import studyRouter from './routes/study.routes.js';
import emojiRouter from './routes/emoji.routes.js';
import habitRouter from './routes/habit.routes.js';
import focusRouter from './routes/focus.routes.js';

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 헬스 체크
app.get('/', (req, res) => {
  res.json({ ok: true, message: '공부의 숲 BE 서버 동작 중' });
});

// 라우터 마운트
app.use('/studies', studyRouter);
app.use('/studies/:studyId/emojis', emojiRouter);
app.use('/studies/:studyId/habits', habitRouter);
app.use('/focus', focusRouter);

// 핸들러 정상 응답 확인
app.get(
  '/test/ok',
  asyncHandler(async (req, res) => {
    res.json({ success: true, message: '핸들러가 정상 작동합니다!' });
  }),
);

// 400 커스텀 에러 확인
app.get(
  '/test/error',
  asyncHandler(async (req, res) => {
    throw new ValidationError('테스트용 잘못된 요청입니다.');
  }),
);

// 404 커스텀 에러 확인
app.get(
  '/test/not-found-error',
  asyncHandler(async (req, res) => {
    throw new NotFoundError('스터디를 찾을 수 없습니다.');
  }),
);

// 500 예상치 못한 에러 확인
app.get(
  '/test/server-error',
  asyncHandler(async (req, res) => {
    throw new Error('예상하지 못한 에러');
  }),
);

export default app;

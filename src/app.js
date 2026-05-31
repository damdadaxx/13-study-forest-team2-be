import express from 'express';
import cors from 'cors';
import studyRouter from './routes/study.routes.js';
import emojiRouter from './routes/emoji.routes.js';
import habitRouter from './routes/habit.routes.js';
import focusRouter from './routes/focus.routes.js';
import testRouter from './routes/test.routes.js';

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
app.use('/studies', focusRouter);
app.use('/test', testRouter);

export default app;

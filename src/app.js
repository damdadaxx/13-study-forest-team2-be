import express from 'express';
import cors from 'cors';
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
app.use('/api/v1/studies', studyRouter);
app.use('/api/v1/studies/:studyId/emojis', emojiRouter);
app.use('/api/v1/studies/:studyId/habits', habitRouter);
app.use('/api/v1/focus', focusRouter);

export default app;

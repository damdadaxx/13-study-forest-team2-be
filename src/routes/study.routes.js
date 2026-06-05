import express from 'express';
import {
  createStudy,
  deleteStudy,
  getStudies,
  getStudy,
  updateStudy,
  verifyPassword,
} from '../controllers/study.controller.js';

const router = express.Router();

// GET /studies - 스터디 둘러보기/검색/정렬
router.get('/', getStudies);

// POST /studies - 스터디 생성
router.post('/', createStudy);

// GET /studies/:id - 스터디 상세 조회 (최근 조회 / 비밀번호 검증 / 총 집중포인트)
router.get('/:id', getStudy);

// PATCH /studies/:id - 스터디 수정 (비밀번호 필요)
router.patch('/:id', updateStudy);

// DELETE /studies/:id - 스터디 삭제 (비밀번호 필요)
router.delete('/:id', deleteStudy);

router.post('/:id/verifyPassword', verifyPassword);

export default router;

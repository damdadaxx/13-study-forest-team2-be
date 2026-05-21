import express from "express";

const router = express.Router();

// GET /api/v1/studies - 스터디 둘러보기/검색/정렬
router.get("/", (req, res) => {
  res.json({ todo: "GET studies 구현 예정" });
});

// POST /api/v1/studies/ - 스터디 생성
router.post("/", (req, res) => {
  res.json({ todo: "POST study 구현 예정" });
});

// GET /api/v1/studies/:id - 스터디 상세 조회 (최근 조회 / 비밀번호 검증 / 총 집중포인트)
router.get("/:id", (req, res) => {
  res.json({ todo: "GET study detail 구현 예정" });
});

// PATCH /api/v1/studies/:id - 스터디 수정 (비밀번호 필요)
router.patch("/:id", (req, res) => {
  res.json({ todo: "PATCH study 구현 예정" });
});

// DELETE /api/v1/studies/:id - 스터디 삭제 (비밀번호 필요)
router.delete("/:id", (req, res) => {
  res.json({ todo: "DELETE study 구현 예정" });
});

export default router;

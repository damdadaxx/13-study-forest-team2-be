import express from "express";

const router = express.Router({ mergeParams: true });

// GET /api/v1/studies/:studyId/emojis - 이모지 목록
router.get("/", (req, res) => {
  res.json({ todo: "GET emojis 구현 예정", studyId: req.params.studyId });
});

// POST /api/v1/studies/:studyId/emojis - 이모지 생성
router.post("/", (req, res) => {
  res.json({ todo: "POST emoji 구현 예정" });
});

// PATCH /api/v1/studies/:studyId/emojis/:emojiId - 이모지 수정
router.patch("/:emojiId", (req, res) => {
  res.json({ todo: "PATCH emoji 구현 예정" });
});

export default router;

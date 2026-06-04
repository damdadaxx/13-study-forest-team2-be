// ============================================
// Emoji Zod 스키마
// ============================================

import { z } from 'zod';

// 스터디 ID 파라미터 스키마
export const emojiParamsSchema = z.object({
  studyId: z.coerce
    .number({ error: 'id는 숫자여야 합니다' })
    .int('id는 정수여야 합니다')
    .positive('id는 양수여야 합니다'),
});

// 이모지 요청 바디 스키마
export const emojiBodySchema = z.object({
  emoji: z.string().min(1, 'emoji은 1자 이상이어야 합니다').trim(),
});

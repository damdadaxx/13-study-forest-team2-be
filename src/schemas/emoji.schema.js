// ============================================
// Emoji Zod 스키마
// ============================================

import { z } from 'zod';

// 스터디 아이디 조회 스키마
export const emojiParamsSchema = z.object({
  studyId: z.coerce
    .number({ error: 'id는 숫자여야 합니다' })
    .int('id는 정수여야 합니다')
    .positive('id는 양수여야 합니다'),
});

// 이모지 생성 및 카운트 업 스키마
export const upsertEmojiSchema = z
  .object({
    emoji: z.string().min(1, 'emoji은 1자 이상이어야 합니다').trim(),
    count: z.coerce
      .number({ error: 'count는 숫자여야 합니다' })
      .int('count는 정수여야 합니다')
      .min(1, 'count는 1 이상이어야 합니다'),
  })
  .partial();

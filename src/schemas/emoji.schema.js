// ============================================
// Emoji Zod 스키마
// ============================================

import { z } from 'zod';

// 이모지 생성 및 카운트 업 스키마 (사용자 입력)
export const upsertEmojiSchema = z
  .object({
    emoji: z.string().min(1, 'emoji은 1자 이상이어야 합니다').trim(),
    count: z.coerce
      .number()
      .int('count는 정수여야 합니다')
      .min(1, 'count는 1 이상이어야 합니다'),
  })
  .partial();

import { z } from 'zod';

// 체크 토글 바디 검증 - { isChecked: boolean } 필수
export const checkHabitSchema = z.object({
  isChecked: z.boolean({ error: 'isChecked는 boolean이어야 합니다.' }),
});

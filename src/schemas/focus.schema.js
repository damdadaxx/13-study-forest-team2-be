import { z } from 'zod';

export const focusParamsSchema = z.object({
  studyId: z.coerce
    .number({ error: 'id는 숫자여야 합니다' })
    .int('id는 정수여야 합니다')
    .positive('id는 양수여야 합니다'),
});

export const focusBodySchema = z.object({
  duration: z
    .number({ error: 'duration은 숫자여야 합니다.' })
    .int('duration은 정수여야 합니다.')
    .positive('duration은 양수여야 합니다.'),
});

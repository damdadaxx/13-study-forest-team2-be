import { z } from 'zod';

// 테스트용 유효성 검증
const focusSessionSchema = z.object({
  duration: z
    .number({ error: '문자열입니다.' })
    .int('totalPoint는 정수여야 합니다')
    .min(1, { message: '집중 시간은 1초 이상이어야 합니다.' }),
});

export default focusSessionSchema;

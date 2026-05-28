import { z } from 'zod';

// 체크 토글 바디 검증 - { isChecked: boolean } 필수
export const checkHabitSchema = z.object({
  isChecked: z.boolean({ error: 'isChecked는 boolean이어야 합니다.' }),
});

// 공통 id 검증기 (숫자 문자열 -> 양의 정수)
const idField = z.coerce
  .number({ error: 'id는 숫자여야 합니다.' })
  .int('id는 정수여야 합니다.')
  .positive('id는 양수여야 합니다.');

// GET /studies/:studyId/habits 의 path params
export const habitListParamsSchema = z.object({
  studyId: idField,
});

// PATCH /studies/:studyId/habits/:habitId/check 의 path params
export const habitCheckParamsSchema = z.object({
  studyId: idField,
  habitId: idField,
});

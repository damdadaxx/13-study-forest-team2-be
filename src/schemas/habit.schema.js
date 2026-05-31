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
// + habit PATCH 와 DELETE 에도 활용
export const habitCheckParamsSchema = z.object({
  studyId: idField,
  habitId: idField,
});

// POST /studies/:studyId/habits +PATCH /studies/:studyId/habits/:habitId
export const habitContentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, '습관 이름을 작성해주세요')
    .max(20, '습관 이름은 최대 20자 입니다.'), // 최소 1자 최대 20자 제한
});

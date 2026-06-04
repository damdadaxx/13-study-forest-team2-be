import { z } from 'zod';

export const studyParamsSchema = z.object({
  id: z.coerce
    .number({ error: 'id는 숫자여야 합니다' })
    .int('id는 정수여야 합니다')
    .positive('id는 양수여야 합니다'),
});

export const studyQuerySchema = z
  .object({
    keyword: z
      .string()
      .max(100, 'keyword는 100자 이하여야 합니다')
      .trim()
      .min(1, 'keyword는 공백 제외 1자 이상 이어야 합니다'),
    cursor: z.coerce
      .number({ error: 'cursor는 숫자여야 합니다' })
      .int('cursor는 정수여야 합니다')
      .positive('cursor는 양수여야 합니다'),
    limit: z.coerce
      .number({ error: 'limit는 숫자여야 합니다' })
      .int('limit는 정수여야 합니다')
      .positive('limit는 양수여야 합니다'),
    sort: z.enum(
      ['recent', 'oldest', 'pointDesc', 'pointAsc'],
      "sort는 'recent','oldest','pointDesc','pointAsc' 중 하나여야 합니다",
    ),
  })
  .partial();

export const studyBodySchema = z.object({
  nickname: z
    .string({ error: 'nickname은 필수입니다' })
    .min(1, 'nickname은 1자 이상이어야 합니다')
    .max(5, 'nickname은 5자 이하여야 합니다'),
  title: z
    .string({ error: 'title은 필수입니다' })
    .min(1, 'title은 1자 이상이어야 합니다')
    .max(5, 'title은 5자 이하여야 합니다'),
  description: z
    .string({ error: 'description은 필수입니다' })
    .min(1, 'description은 1자 이상이어야 합니다')
    .max(500, 'description은 500자 이하여야 합니다'),
  background: z.enum(
    ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8'],
    "background는 'img1', 'img2', 'img3', 'img4','img5', 'img6', 'img7', 'img8' 중 하나여야 합니다",
  ),
  password: z
    .string({ error: 'password은 필수입니다' })
    .min(8, 'password은 8자 이상이어야 합니다')
    .max(15, 'password은 15자 이하여야 합니다'),
});

export const updateStudySchema = z
  .object({
    nickname: z
      .string()
      .min(1, 'nickname은 1자 이상이어야 합니다')
      .max(5, 'nickname은 5자 이하여야 합니다')
      .optional(),
    title: z
      .string()
      .min(1, 'title은 1자 이상이어야 합니다')
      .max(5, 'title은 5자 이하여야 합니다')
      .optional(),
    description: z
      .string()
      .min(1, 'description은 1자 이상이어야 합니다')
      .max(500, 'description은 500자 이하여야 합니다')
      .optional(),
    background: z
      .enum(
        ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8'],
        "background는 'img1', 'img2', 'img3', 'img4','img5', 'img6', 'img7', 'img8' 중 하나여야 합니다",
      )
      .optional(),
    totalPoint: z
      .number({ error: 'totalPoint는 숫자여야 합니다' })
      .int('totalPoint는 정수여야 합니다')
      .nonnegative('totalPoint는 0이상이어야 합니다')
      .optional(),
    password: z
      .string({ error: 'password는 필수입니다' })
      .min(8, 'password는 8자 이상이어야 합니다')
      .max(15, 'password는 15자 이하여야 합니다'),
    newPassword: z
      .string()
      .min(8, 'password는 8자 이상이어야 합니다')
      .max(15, 'password는 15자 이하여야 합니다')
      .optional(),
  })
  .refine((data) => {
    const { password, ...rest } = data;
    return Object.values(rest).some((v) => v !== undefined);
  }, '수정사항이 존재하지 않습니다');

export const deleteStudySchema = z.object({
  password: z
    .string({ error: 'password는 필수입니다' })
    .min(8, 'password는 8자 이상이어야 합니다')
    .max(15, 'password는 15자 이하여야 합니다'),
});

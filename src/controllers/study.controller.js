import prisma from '../lib/prisma.js';
import {
  deleteStudySchema,
  studyBodySchema,
  studyParamsSchema,
  studyQuerySchema,
  updateStudySchema,
  verifyPasswordSchema,
} from '../schemas/study.schema.js';
import asyncHandler from '../utils/asyncHandler.js';
import {
  NotFoundError,
  Unauthorized,
  ValidationError,
} from '../utils/errors.js';

export const createStudy = asyncHandler(async (req, res) => {
  const { nickname, title, description, background, password } =
    studyBodySchema.parse(req.body);
  const newStudy = await prisma.study.create({
    data: {
      nickname,
      title,
      description,
      background,
      password,
    },
  });
  res
    .status(201)
    .json({ success: true, data: newStudy, message: '스터디 등록 성공' });
});

export const getStudies = asyncHandler(async (req, res) => {
  const {
    keyword,
    cursor,
    limit = 6,
    sort,
  } = studyQuerySchema.parse(req.query);
  let orderBy;
  switch (sort) {
    case 'recent':
      orderBy = [{ createdAt: 'desc' }, { id: 'desc' }];
      break;
    case 'oldest':
      orderBy = [{ createdAt: 'asc' }, { id: 'asc' }];
      break;
    case 'pointDesc':
      orderBy = [{ totalPoint: 'desc' }, { id: 'desc' }];
      break;
    case 'pointAsc':
      orderBy = [{ totalPoint: 'asc' }, { id: 'desc' }];
      break;
    default:
      orderBy = [{ createdAt: 'desc' }, { id: 'desc' }];
  }
  const where = keyword
    ? {
        OR: [
          { nickname: { contains: keyword, mode: 'insensitive' } },
          { title: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ],
      }
    : {};
  const studies = await prisma.study.findMany({
    where,
    include: {
      habits: true,
      emojis: true,
    },
    take: limit + 1,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy,
  });
  const hasNext = studies.length > limit;
  const data = studies.slice(0, limit);
  const nextCursor = hasNext ? data[data.length - 1].id : null;
  res.status(200).json({
    success: true,
    data,
    nextCursor,
  });
});

export const getStudy = asyncHandler(async (req, res) => {
  const { id } = studyParamsSchema.parse(req.params);
  const study = await prisma.study.findUnique({
    where: { id },
    include: {
      habits: {
        include: {
          habitRecords: true,
        },
      },
      emojis: true,
    },
  });
  if (!study) {
    throw new NotFoundError();
  }
  res.status(200).json({ success: true, data: study });
});

export const updateStudy = asyncHandler(async (req, res) => {
  const { id } = studyParamsSchema.parse(req.params);
  const {
    nickname,
    title,
    description,
    background,
    password,
    totalPoint,
    newPassword,
  } = updateStudySchema.parse(req.body);
  const studyPasswordValidation = await prisma.study.findUnique({
    where: { id },
  });
  if (!studyPasswordValidation) throw new NotFoundError();
  if (studyPasswordValidation.password !== password) throw new Unauthorized();
  if (newPassword === password)
    throw new ValidationError('기존 비밀번호와 동일합니다');

  const study = await prisma.study.update({
    where: { id },
    data: {
      nickname,
      title,
      description,
      background,
      totalPoint,
      password: newPassword,
    },
  });
  res
    .status(200)
    .json({ success: true, data: study, message: '스터디 수정 성공' });
});

export const deleteStudy = asyncHandler(async (req, res) => {
  const { id } = studyParamsSchema.parse(req.params);
  const { password } = deleteStudySchema.parse(req.body);
  const studyPasswordValidation = await prisma.study.findUnique({
    where: { id },
  });
  if (!studyPasswordValidation) throw new NotFoundError();
  if (studyPasswordValidation.password !== password) throw new Unauthorized();

  await prisma.study.delete({
    where: { id },
  });
  res.status(200).json({ success: true, message: '스터디 삭제 성공' });
});

export const verifyPassword = asyncHandler(async (req, res) => {
  const { id } = studyParamsSchema.parse(req.params);
  const { password } = verifyPasswordSchema.parse(req.body);

  const study = await prisma.study.findUnique({ where: { id } });
  if (!study) throw new NotFoundError();

  const isValid = study.password === password;
  res.status(200).json({ success: true, data: isValid });
});

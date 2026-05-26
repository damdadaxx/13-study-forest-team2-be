import prisma from '../src/lib/prisma.js';
import { studies } from './seedData.js';

async function seed() {
  await prisma.study.deleteMany();

  console.log('기존 데이터 삭제 완료');

  await Promise.all(studies.map((data) => prisma.study.create({ data })));

  console.log(`${studies.length}개 스터디 생성`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

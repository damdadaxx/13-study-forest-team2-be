# 공부의 숲 BE (study-forest team2)

코드잇 FS-13 2팀 초급 프로젝트 백엔드 저장소입니다.

## 기술 스택

- Node.js >= 20
- Express 5
- Prisma 6 + PostgreSQL
- Zod

## 시작하기

### 1. 클론 & 의존성 설치

```bash
git clone https://github.com/damdadaxx/13-study-forest-team2-be.git
cd 13-study-forest-team2-be
npm install
```

### 2. 환경변수 설정

`.env.example` 을 복사해서 `.env` 파일을 만들고, 본인 환경에 맞게 수정합니다.

```bash
cp .env.example .env
```

`.env` 예시:

```
# 본인 로컬 PostgreSQL 정보로 수정
DATABASE_URL="postgresql://본인유저:본인비밀번호@localhost:5432/study_forest?schema=public"
```

### 3. DB 마이그레이션

```bash
npm run prisma:migrate
```

### 4. 개발 서버 실행

```bash
npm run dev
```

서버 실행 후 http://localhost:3001 에서 확인 가능합니다

## 자주 쓰는 명령어

| 명령어                   | 설명                                      |
| ------------------------ | ----------------------------------------- |
| `npm run dev`            | 개발 서버 (nodemon)                       |
| `npm start`              | 프로덕션 서버                             |
| `npm run prisma:migrate` | 마이그레이션 생성 + 적용                  |
| `npm run prisma:studio`  | DB GUI (브라우저)                         |
| `npm run prisma:reset`   | DB 초기화                                 |
| `npm run prisma:push`    | 스키마 즉시 적용 (마이그레이션 파일 없이) |
| `npm run seed`           | 시드 데이터 삽입                          |

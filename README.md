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

### 2. DB 마이그레이션

```bash
npm run prisma:migrate
```

### 3. 개발 서버 실행

```bash
npm run dev
```

→ http://localhost:3001

## 자주 쓰는 명령어

| 명령어                   | 설명                     |
| ------------------------ | ------------------------ |
| `npm run dev`            | 개발 서버 (nodemon)      |
| `npm start`              | 프로덕션 서버            |
| `npm run prisma:migrate` | 마이그레이션 생성 + 적용 |
| `npm run prisma:studio`  | DB GUI (브라우저)        |
| `npm run prisma:reset`   | DB 초기화                |
| `npm run seed`           | 시드 데이터 삽입         |

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

### 4. 브랜치 생성

작업할 기능에 맞춰 `dev` 브랜치에서 새 브랜치를 만들어 작업합니다.

```bash
git checkout dev
git pull origin dev
git checkout -b feature/{기능명}
```

브랜치 명명 규칙은 `feature/{기능명}` 으로 통일합니다.

- 예 : `feature/init-setting`, `feature/habit-page`, `feature/seed`

### 5. 개발 서버 실행

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


# **{ 오행구족 }**

(팀 협업 문서 링크 게시)

## **팀원 구성**

한효주 (팀장, 스터디 페이지 담당)

이은범 (부팀장, 오늘의 습관 페이지 담당)

최훈민 (스터디 페이지 담당)

박지선  (오늘의 집중 페이지 담당)

이진태 (오늘의 집중 페이지 담당)

송현규  (오늘의 습관 페이지 담당)

---

## **프로젝트 소개 (공부의 숲)**

- 효율적인 스터디 관리 플랫폼
- 프로젝트 기간: 2026.05.18 ~ 2026.06.08

---

## **기술 스택**

### Core

- Node.js >= 20
- Express 5
- Prisma 6 + PostgreSQL
- Zod

---

## **팀원별 구현 기능 상세**

### 한효주 (팀장)

| 작업 내용 | 참고사항 (설명) |
| --- | --- |
| 스터디 | 이모지 API 구현 이모지 API |
| 스터디 | study, emoji schema study, emoji 스키마 |

---

### 이은범 (부팀장)

| 작업 내용 | 참고사항 (설명) |
| --- | --- |
| 공통 | TextArea API 구현 |
| 공통 | Input API 구현 |
| 공통 | 파일구조 및 초기세팅  |
| 공통 | Render를 통한 배포작업 |
| 오늘의 습관 | 조회 GET, PATCH 체크 토글 API |

---

### 최훈민

| 작업 내용  | 참고사항 (설명) |
| --- | --- |
| 공통 | seed.js |
| 스터디 | 스터디 CRUD API |
| 스터디 | 수정, 삭제 시 비밀번호 검증 API |

---

### 박지선

| 작업 내용  | 참고사항 (설명) |
| --- | --- |
| 공통 | AsyncHandler 개발 |
| 공통 | 개념적 스키마 초기 작성 |
| 오늘의 집중 | 오늘의 집중 API 개발 |

---

### 이진태

| 작업 내용  | 참고사항 (설명) |
| --- | --- |
| 공통 | 개념적, 물리적 스키마 작성 |

---

### 송현규

| 작업 내용  | 참고사항 (설명) |
| --- | --- |
| 공통 | 개념적 스키마 초기 작성 |
| 공통  | Error 작성 |
| 오늘의 습관 | 생성, 수정, 삭제 API 기능 개발 |

---

## **파일 구조**

```
backend/
├── .github/
│   └── pull_request_template.md   # PR 자동으로 채워지는 템플릿
├── prisma/
│   ├── migrations/                # Prisma 마이그레이션 기록
│   │   ├── 20260524075950_init/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma              # DB 모델 정의
│   ├── seed.js                    # 시드 실행 스크립트
│   └── seedData.js                # 시드 더미 데이터
├── http/                          # API 테스트용 (.http)
│   ├── study.http  
│   ├── emoji.http
│   ├── habit.http
│   ├── focus.http
│   └── test.http                  # 헬스체크/동작 확인용
├── src/
│   ├── server.js                  # 서버 진입점 (dotenv/config + listen)
│   ├── app.js                     # Express 인스턴스 + 미들웨어/라우터 등록
│   ├── routes/                    # URL → controller 매핑
│   │   ├── study.routes.js   
│   │   ├── emoji.routes.js
│   │   ├── habit.routes.js
│   │   ├── focus.routes.js   
│   │   └── test.routes.js
│   ├── controllers/               # req/res 처리, 비즈니스 로직
│   │   ├── study.controller.js
│   │   ├── emoji.controller.js
│   │   ├── habit.controller.js
│   │   ├── focus.controller.js
│   │   └── test.controller.js
│   ├── schemas/                   # Zod 입력 검증 스키마
│   │   ├── study.schema.js
│   │   ├── emoji.schema.js
│   │   ├── habit.schema.js   
│   │   ├── focus.schema.js
│   │   └── test.schema.js
│   ├── lib/                       # 외부 라이브러리 싱글톤
│   │   └── prisma.js              # PrismaClient 인스턴스
│   └── utils/                     # 순수 함수 헬퍼
│       ├── asyncHandler.js        # async 에러 자동 next
│       ├── date.js                # 날짜/타임존 헬퍼 (0시 초기화 등)
│       └── errors.js              # 커스텀 에러 클래스
├── .env                           # 로컬 개발용 (gitignore)
├── .env.example                   # 환경변수 템플릿 (깃에 올라감)
├── .gitignore
├── .prettierrc
├── package.json
├── package-lock.json              # 의존성 잠금 파일
└── README.md
```
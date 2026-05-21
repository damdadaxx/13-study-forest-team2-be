import dotenv from "dotenv";

// NODE_ENV에 따라 .env.development 또는 .env.production 로드
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

// app은 .env 로드 후에 import (app.js가 환경변수 쓸 수 있게)
const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(
    `🚀 서버가 http://localhost:${PORT} 에서 실행 중 (${process.env.NODE_ENV || "development"})`,
  );
});

// 날짜 유틸 - "오늘"을 KST(Asia/Seoul) 기준 달력 날짜로 계산한다.
//
// 왜 이렇게 하냐 :
// - HabitRecord.date는 Prisma `@db.Date` 타입이라 "날짜"만 저장된다.
//   Prisma는 JS Date 를 @db.Date로 직렬화할 때 UTC 날짜 부분을 쓴다.
// - new Date() + setHours(0,0,0,0) 는 "로컬(호스트 TZ) 자정" 이라,
//   호스트가 UTC(CI/Render 기본)냐 KST(개발자 맥)냐에 따라 결과가 하루 어긋난다.
// - 그래서 호스트 TZ와 무관하게 "KST 기준 오늘 날짜"를 직접 구해
//   그 날짜의 UTC자정 Date를 만든다. 어디서 돌려도 같은 값이 나온다.

const KST_OFFSET_MS = 9 * 60 * 60 * 1000; // UTC+9

// KST 기준 오늘의 UTC 자정 Date. HabitRecord.date 비교/생성에 사용.
// 예) KST 2026-05-28 03:00 이면 -> 2026-05-28T00:00:00.000Z
export function getTodayKst() {
  const nowKstMs = Date.now() + KST_OFFSET_MS;
  const kst = new Date(nowKstMs);
  // getUTC* 로 읽으면 KST 달력값이 그대로 나온다 (오프셋을 이미 더했으므로)
  return new Date(
    Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate()),
  );
}

// Date -> "YYYY-MM-DD" (UTC 날짜 부분). @db.Date와 동일한 기준으로 문자열화.
export function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

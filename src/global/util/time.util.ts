export default function getKoreaTime(): Date {
  const now = new Date(); // 현재 시간
  // const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  // const koreaTimeDiff = 9 * 60 * 60 * 1000;
  // const koreaNow = new Date(utcNow + koreaTimeDiff);
  now.setHours(now.getHours() + 9);
  return now;
}

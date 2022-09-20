export default function getKoreaTime(): Date {
  const now = new Date();
  now.setHours(now.getHours() + 9);
  return now;
}

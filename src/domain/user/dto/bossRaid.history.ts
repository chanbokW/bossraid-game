export class BossRaidHistory {
  raidRecordId: number;
  score: number;
  enterTime: string;
  endTime: string;

  constructor(raidRecordId, score, enterTime, endTime) {
    this.raidRecordId = raidRecordId;
    this.score = score;
    this.enterTime = enterTime;
    this.endTime = endTime;
  }
}

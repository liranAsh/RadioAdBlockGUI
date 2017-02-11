/**
 * Created by Liran on 11/02/2017.
 */
export class Frequency {
  public freq: number;
  public priority: number;
  public isAdTransmit: boolean;
  public isPlay: boolean;

  constructor(freq: number, priority: number) {
    this.freq = freq;
    this.priority = priority;
    this.isAdTransmit = false;
    this.isPlay = false;
  }
}

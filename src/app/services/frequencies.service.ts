/**
 * Created by Liran on 11/02/2017.
 */

import {Injectable} from "@angular/core";
import {Frequency} from "../models/frequency";

export interface SavedFrequency {
  freq: number,
  priority: number
}

@Injectable()
export class FrequenciesService {

  private freqs: SavedFrequency[];

  constructor() {
    // this.freqs = [];
    this.freqs = [new Frequency(91.8, 1), new Frequency(100, 2)];
  }

  public getFreqs(): SavedFrequency[] {

    return this.freqs;
  }

  public save(freqs: SavedFrequency[]): void {
    this.freqs = freqs.concat([]);
  }
}

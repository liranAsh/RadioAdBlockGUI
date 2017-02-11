/**
 * Created by Liran on 11/02/2017.
 */

import {Injectable} from "@angular/core";
import {Frequency} from "../models/frequency";
import {Song} from "../models/Song";

@Injectable()
export class SongsService {

  private songs: Song[];

  constructor() {
    this.songs = [];
  }

  public getSongs(): Song[] {

    return this.songs;
  }

  public save(songs: Song[]): void {
    this.songs = songs.concat([]);
  }
}

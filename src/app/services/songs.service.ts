/**
 * Created by Liran on 11/02/2017.
 */

import {Injectable} from "@angular/core";
import {Frequency} from "../models/frequency";
import {Song} from "../models/Song";
import {ManageJsonFileService, JsonFileResult} from "./manage-json-file.service";

@Injectable()
export class SongsService {

  private static FILENAME: string = "resources/songs-data.json";
  private songs: Song[];
  private promiseReadFile: Promise<JsonFileResult>;

  constructor(private manageJsonFileService: ManageJsonFileService) {

    this.promiseReadFile = this.manageJsonFileService.readJsonFile(SongsService.FILENAME);
    this.promiseReadFile.then((result: JsonFileResult) => {

      if (result.isSuccess) {
        this.songs = result.res;
      }
    });
  }

  public getSongs(): Promise<Song[]> {

    return new Promise<Song[]>(resolve => {
      this.promiseReadFile.then((result: JsonFileResult) => {

        resolve(this.songs);
      })
    });
  }

  public save(songs: Song[]): void {

    // Save songs to file
    this.manageJsonFileService.writeToJson(SongsService.FILENAME, JSON.stringify(songs)).then((isSuccess: boolean) => {

      if (isSuccess) {
        this.songs = songs.concat([]);
      }
    });
  }
}

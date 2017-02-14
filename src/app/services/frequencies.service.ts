/**
 * Created by Liran on 11/02/2017.
 */

import {Injectable} from "@angular/core";
import {Frequency} from "../models/frequency";
import {JsonFileResult, ManageJsonFileService} from "./manage-json-file.service";

export interface SavedFrequency {
  freq: number,
  priority: number
}

@Injectable()
export class FrequenciesService {

  private static FILENAME: string = "resources/settings-data.json";
  private promiseReadFile: Promise<JsonFileResult>;
  private freqs: SavedFrequency[];

  constructor(private manageJsonFileService: ManageJsonFileService) {
    this.promiseReadFile = this.manageJsonFileService.readJsonFile(FrequenciesService.FILENAME);
    this.promiseReadFile.then((result: JsonFileResult) => {

      if (result.isSuccess) {
        this.freqs = result.res;
      }
    });
  }

  public getFreqs(): Promise<SavedFrequency[]> {

    return new Promise<SavedFrequency[]>(resolve => {
      this.promiseReadFile.then((result: JsonFileResult) => {

        resolve(this.freqs);
      })
    });
  }

  public save(freqs: SavedFrequency[]): Promise<any> {

    return new Promise<any>(resolve => {

      // Save songs to file
      this.manageJsonFileService.writeToJson(FrequenciesService.FILENAME, JSON.stringify(freqs)).then((isSuccess: boolean) => {

        if (isSuccess) {
          this.freqs = freqs.concat([]);
          resolve();
        }
      });
    });
  }
}

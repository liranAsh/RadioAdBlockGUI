/**
 * Created by Liran on 11/02/2017.
 */
import {Component, OnInit} from "@angular/core";
import {FrequenciesService, SavedFrequency} from "../../services/frequencies.service";
import {Frequency} from "../../models/frequency";
import {Router} from "@angular/router";
import {MdDialog} from "@angular/material";
import {RecordAdComponent} from "../record_ad/record-ad.component";
import {ChildProcess} from "child_process";
import {AppConfig} from "../../../../config/app-config";
import {ManageMatlabFilesService} from "../../services/manage-matlab-files.service";
import {MatlabTypeEnum} from "../../enums/MatlabType";
import {SongsService} from "../../services/songs.service";
import {Song} from "../../models/Song";

interface AlgorithmData {
  data: SavedFrequency[],
  adStatus: number,
  playlist: string[]
}


@Component({

  templateUrl: "./management.component.html",
  styles: [`
    .marginTable {
        margin-top: 10vh;
    }  
  `]
})
export class ManagementComponent implements OnInit {

  public freqs: Frequency[];
  private playlist: string[];
  public isRunningAlgorithm: boolean;
  public isRunningRecord: boolean;
  private isLoadingAlgorithm: boolean;
  private isLoadingRecord: boolean;
  private algorithmAdState: number;
  private isApplicationLoadFreqs: boolean;
  private exec = require("child_process").exec;

  constructor(private freqService: FrequenciesService,
              private songsService: SongsService,
              private manageMatlabService: ManageMatlabFilesService,
              private router: Router) {}

  public ngOnInit(): void {

    this.freqs = [];
    this.isApplicationLoadFreqs = false;
    this.isLoadingAlgorithm = false;
    this.isLoadingRecord = false;
    this.isRunningAlgorithm = false;
    this.isRunningRecord = false;
    this.algorithmAdState = 0;

    // Init frequencies from service
    this.freqService.getFreqs().then((savedFreqs: SavedFrequency[]) => {
      savedFreqs.forEach((freq: SavedFrequency) => {
        this.freqs.push(new Frequency(freq.freq, freq.priority));
      });

      this.isApplicationLoadFreqs = true;
    });

    this.songsService.getSongs().then((songs: Song[]) => {
      this.playlist = songs.map((song: Song) => song.path);
    })

  }

  public navigateSettings(): void {
    this.router.navigate(["settings"]);
  }

  public navigateUploadSongs(): void {
    this.router.navigate(["songs"]);
  }

  public onAdStateChange(output: string): void {
    this.algorithmAdState = Number(output);
  }

  public executeOrKillMatlabFile(isAlgorithm: boolean): void {

    this.beforeExecuteCommand(isAlgorithm).then(() => {

      let setRunning: (isRunning: boolean) => void = (isRunning: boolean) => {
        if (isAlgorithm) {
          this.isRunningAlgorithm = isRunning;
        } else {
          this.isRunningRecord = isRunning;
        }
      };

      let setIsLoading: (isLoading: boolean) => void = (isLoading: boolean) => {
        if (isAlgorithm) {
          this.isLoadingAlgorithm = isLoading;
        } else {
          this.isLoadingRecord = isLoading;
        }
      };

      let proc = null;
      let command: string = this.buildCommand(isAlgorithm);
      let isRunning: boolean = (isAlgorithm) ?  this.isRunningAlgorithm : this.isRunningRecord;


      // Execute
      if (!isRunning) {
        setRunning(true);
        setIsLoading(true);

        proc = this.exec(command, { cwd: 'C:/windows' }, (error, stdout, stderr) => {

          if (error) {
            setRunning(false);
            setIsLoading(false);
            console.log(error);
            return;
          }

          if (isAlgorithm) {
            this.manageMatlabService.addTask(MatlabTypeEnum.ALGORITHM).then(() => this.isLoadingAlgorithm = false);
          } else {
            this.manageMatlabService.addTask(MatlabTypeEnum.RECORD).then(() => this.isLoadingRecord = false);
          }

          console.log(proc);
        });
      }
      // Kill
      else {

        setIsLoading(true);
        if (isAlgorithm) {
          this.manageMatlabService.killTask(MatlabTypeEnum.ALGORITHM).then(() => setIsLoading(false));
        } else {
          this.manageMatlabService.killTask(MatlabTypeEnum.RECORD).then(() => setIsLoading(false));
        }

        setRunning(false);
      }
    });
  }

  // TODO: Implement command
  private buildCommand(isAlgorithm: boolean): string {

    let command: string = "";

    if (isAlgorithm) {

      // Get matlab.exe path
      let matlabPath: string = AppConfig.MATLAB_PATH;

      // Flags
      let flags: string = "-nodisplay -minimize -nosplash -nodesktop -r";

      // Get algorithm .m file
      let algorithmPath: string = AppConfig.ALGO_PATH;

      command = "\"" + matlabPath + "\" " + flags + " \"run('" + algorithmPath + "')\"";

    } else {

      // TODO: Implement command for start script of recording

    }

    return command;
  }

  private beforeExecuteCommand(isAlgorithm: boolean): Promise<any> {

    return new Promise<any>((resolve: any) => {
      if (isAlgorithm) {

        let data: AlgorithmData = {
          data: [],
          adStatus: 0,
          playlist: this.playlist
        };

        // Save data from frequency list
        this.freqs.forEach((freq: Frequency) => {
          data.data.push({freq: freq.freq, priority: freq.priority});
        });

        data.adStatus = this.algorithmAdState;

        console.log(data);
        resolve();

        // Build json file from data
        let fs = require("fs");

        fs.writeFile("resources/example_json.json", JSON.stringify(data), (err) => {
          if (err) {
            console.log(err);
          }
        })
      }

      else {
        resolve();
      }
    });


  }
}

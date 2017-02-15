/**
 * Created by Liran on 11/02/2017.
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
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
import {Subscription} from "rxjs";
import {ReadResponseService} from "../../services/read-response.service";
import {MaofResponse, MaofFrequency} from "../../interfaces/maof-interfaces";

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
export class ManagementComponent implements OnInit, OnDestroy {

  public freqs: Frequency[];
  private playlist: string[];
  public isRunningAlgorithm: boolean;
  public isRunningRecord: boolean;
  public song: string;
  private isLoadingAlgorithm: boolean;
  private isLoadingRecord: boolean;
  private algorithmAdState: number;
  private isApplicationLoadFreqs: boolean;
  private exec = require("child_process").exec;
  private resSubscription: Subscription;

  constructor(private freqService: FrequenciesService,
              private songsService: SongsService,
              private readResponseService: ReadResponseService,
              private manageMatlabService: ManageMatlabFilesService,
              private router: Router) {}

  public ngOnInit(): void {

    this.freqs = [];
    this.song = "";
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
    });

    // TODO: Implement subscription
    this.resSubscription =
        this.readResponseService.onMaofJsonResponseEmit.subscribe((res: MaofResponse) => {

          if (this.isApplicationLoadFreqs) {

            // Loop over freqs array and add frequencies
            res.data.forEach((freq: MaofFrequency) => {
              let currFreq: Frequency = this.freqs.find((curr: Frequency) => curr.freq == freq.freq);
              currFreq.isAdTransmit = freq.isAd;
              currFreq.isPlay = freq.isPlay;
            });

            this.song = res.song;
          }
        })
  }

  public ngOnDestroy(): void {
    this.resSubscription.unsubscribe();
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

  public executeOrKillMatlabFile(): void {

    this.beforeExecuteCommand().then(() => {

      let command: string = this.buildCommand();

      // Execute
      if (!this.isRunningAlgorithm) {
        this.isRunningAlgorithm = true;
        this.isLoadingAlgorithm = true;

        this.exec(command, { cwd: 'C:/windows' }, (error, stdout, stderr) => {

          if (error) {
            this.isRunningAlgorithm = false;
            this.isLoadingAlgorithm = false;
            console.log(error);
            return;
          }

          this.manageMatlabService.addTask(MatlabTypeEnum.ALGORITHM).then(() => this.isLoadingAlgorithm = false);
        });
      }
      // Kill
      else {

        this.isLoadingAlgorithm = true;
        this.manageMatlabService.killTask(MatlabTypeEnum.ALGORITHM).then(() => this.isLoadingAlgorithm = false);
        this.isRunningAlgorithm = false;
      }
    });
  }

  private buildCommand(): string {

    // Get matlab.exe path
    let matlabPath: string = AppConfig.MATLAB_PATH;

    // Flags
    let flags: string = "-nodisplay -minimize -nosplash -nodesktop -r";

    // Get algorithm .m file
    let algorithmPath: string = AppConfig.ALGO_PATH;

    return "\"" + matlabPath + "\" " + flags + " \"run('" + algorithmPath + "')\"";
  }

  private beforeExecuteCommand(): Promise<any> {

    return new Promise<any>((resolve: any) => {


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
    });
  }

  public startRecord(): void {

    // Set running and loading
    this.isRunningRecord = true;
    this.isLoadingRecord = true;

    // Create directory of record
    let fs = require("fs");
    fs.mkdir(AppConfig.RECORD_PATH, (err) => {
      if (err) {
        console.log(err);
      }
      this.isLoadingRecord = false;
    })
  }

  public stopRecord(): void {

    // Set running and loading
    this.isRunningRecord = false;
    this.isLoadingRecord = true;

    // Create directory of record
    let fs = require("fs");
    fs.rmdir(AppConfig.RECORD_PATH, (err) => {
      if (err) {
        console.log(err);
      }
      this.isLoadingRecord = false;
    })
  }
}

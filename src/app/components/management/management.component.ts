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

let exec = require("child_process").exec;

@Component({

  templateUrl: "./management.component.html"
})
export class ManagementComponent implements OnInit {

  public freqs: Frequency[];
  public isRunning: boolean;

  constructor(private freqService: FrequenciesService,
              private router: Router) {}

  public ngOnInit(): void {

    this.freqs = [];
    this.isRunning = false;

    // Init frequencies from service
    this.freqService.getFreqs().forEach((freq: SavedFrequency) => {
      this.freqs.push(new Frequency(freq.freq, freq.priority));
    });
  }

  public navigateSettings(): void {
    this.router.navigate(["settings"]);
  }

  public navigateUploadSongs(): void {
    this.router.navigate(["songs"]);
  }

  public executeOrKillMatlabFile(): void {

    let proc = null;
    let command: string = this.buildCommand();
    // C:/windows - is the path that the command will execute

    // Add event for proccess - not sure about it
    // process.on("exit", () => {
    //   if (proc) {
    //     proc.kill();
    //   }
    // });

    // Execute
    if (!this.isRunning) {
      this.isRunning = true;
      proc = exec(command, { cwd: 'C:/windows' }, (error, stdout, stderr) => {

        if (error) {
          this.isRunning = false;
          console.log(error);
          return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
    }
    // Kill
    else {
      if (proc) {
        proc.kill();
      }
      this.isRunning = false;
    }
  }

  // TODO: Implement command
  private buildCommand(): string {
    return "dir";
  }
}

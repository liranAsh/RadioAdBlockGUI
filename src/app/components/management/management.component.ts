/**
 * Created by Liran on 11/02/2017.
 */
import {Component, OnInit} from "@angular/core";
import {FrequenciesService, SavedFrequency} from "../../services/frequencies.service";
import {Frequency} from "../../models/frequency";
import {Router} from "@angular/router";
import {MdDialog} from "@angular/material";
import {RecordAdComponent} from "../record_ad/record-ad.component";

@Component({

  templateUrl: "./management.component.html",
  entryComponents: [RecordAdComponent]
})
export class ManagementComponent implements OnInit {

  public freqs: Frequency[];
  public selectedRecordOption: string;

  constructor(private freqService: FrequenciesService,
              private router: Router,
              private dialog: MdDialog) {}

  public ngOnInit(): void {

    this.freqs = [];

    // Init frequencies from service
    this.freqService.getFreqs().forEach((freq: SavedFrequency) => {
      this.freqs.push(new Frequency(freq.freq, freq.priority));
    });

    // this.freqs = [new Frequency(91.8, 1), new Frequency(100, 2)];
  }

  public navigateSettings(): void {
    this.router.navigate(["settings"]);
  }

  public navigateUploadSongs(): void {
    this.router.navigate(["songs"]);
  }

  public openRecordDialog(): void {
    let dialogRef = this.dialog.open(RecordAdComponent);
    dialogRef.afterClosed().subscribe((result: string) => {
      this.selectedRecordOption = result;
    })
  }
}

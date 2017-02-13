import {Component, OnInit, ViewChild} from "@angular/core";
import {SavedFrequency, FrequenciesService} from "../../services/frequencies.service";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Frequency} from "../../models/frequency";
import {NgForm} from "@angular/forms";
/**
 * Created by Liran on 11/02/2017.
 */
@Component({

  templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

  @ViewChild("settingsForm") public settingsForm: NgForm;
  private freqs: Frequency[];

  constructor(private freqsService: FrequenciesService,
              private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer,
              private router: Router) {}

  public ngOnInit(): void {

    // Register icon


    let savedFreqs: SavedFrequency[] = this.freqsService.getFreqs().concat([]);

    this.freqs = [];

    if (savedFreqs.length > 0) {
      savedFreqs.forEach((freq: SavedFrequency) => this.freqs.push(new Frequency(freq.freq, freq.priority)));
    } else {
      this.freqs.push(new Frequency(undefined, undefined));
    }
  }

  public addFreq(): void {
    console.log("Controls: ");
    console.log(this.settingsForm.form.controls);

    console.log("is valid ?");
    console.log(this.settingsForm.form.valid);
    // console.log("Form errors: ");
    this.freqs.push(new Frequency(undefined, undefined));
  }

  public removeFreq(index: number) {
    this.freqs.splice(index, 1);
    console.log("Controls: ");
    console.log(this.settingsForm.form.controls);

    console.log("is valid ?");
    console.log(this.settingsForm.form.valid);
  }

  public saveAndNavigate() {
    this.freqsService.save(this.freqs);
    this.router.navigate(["management"]);
  }
}

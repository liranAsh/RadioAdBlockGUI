import {Component, OnInit} from "@angular/core";
import {SavedFrequency, FrequenciesService} from "../../services/frequencies.service";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
/**
 * Created by Liran on 11/02/2017.
 */
@Component({

  templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

  private freqs: SavedFrequency[];

  constructor(private freqsService: FrequenciesService,
              private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer,
              private router: Router) {}

  public ngOnInit(): void {

    // Register icon


    let savedFreqs: SavedFrequency[] = this.freqsService.getFreqs().concat([]);
    this.freqs = (savedFreqs.length > 0) ? savedFreqs : [{freq: undefined, priority: undefined}];
  }

  public addFreq(): void {
    this.freqs.push({freq: undefined, priority: undefined});
  }

  public removeFreq(index: number) {
    this.freqs.splice(index, 1);
  }

  public saveAndNavigate() {
    this.freqsService.save(this.freqs);
    this.router.navigate(["management"]);
  }
}

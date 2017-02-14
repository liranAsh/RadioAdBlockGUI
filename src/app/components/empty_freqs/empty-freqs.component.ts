/**
 * Created by Liran on 11/02/2017.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";
@Component({
  selector: "empty-freqs",
  templateUrl: "./empty-freqs.component.html"
})
export class EmptyFreqsComponent {
  constructor(private router: Router) {}

  public navigateSettings(): void {
    this.router.navigate(["settings"]);
  }
}

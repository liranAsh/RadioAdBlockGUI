/**
 * Created by Liran on 11/02/2017.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";
@Component({
  selector: "empty-freqs",
  templateUrl: "./empty-freqs.component.html",
  styles: [`

    .outer {
        display: table;
        position: absolute;
        height: 80%;
        width: 99%;
    }
    
    .middle {
        display: table-cell;
        vertical-align: middle;
    }
    
    .inner {
      margin-left: auto;
      margin-right: auto;
      width: 50%;
      text-align: center;
    }
  `]
})
export class EmptyFreqsComponent {
  constructor(private router: Router) {}

  public navigateSettings(): void {
    this.router.navigate(["settings"]);
  }
}

/**
 * Created by huser on 14/02/2017.
 */
import {Component, Output, EventEmitter} from "@angular/core";
import {MdButtonToggleGroup} from "@angular/material";
import {StatesEnum} from "../../../enums/states";

@Component({
  selector: "ad-state",
  templateUrl: "ad-state.component.html"
})
export class AdStateComponent {

  @Output("state") public state: EventEmitter<string>;
  public states = StatesEnum;

  constructor() {
    this.state = new EventEmitter<string>();
  }

  public onChange(group: MdButtonToggleGroup): void {
    // console.log(group.value);
    this.state.emit(group.value);
  }
}

/**
 * Created by Liran on 11/02/2017.
 */
import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
@Component({
  selector: "record-ad",
  templateUrl: "record-ad.component.html"
})
export class RecordAdComponent {


  constructor(public dialogRef: MdDialogRef<RecordAdComponent>) {}
}

import {Component, OnInit} from "@angular/core";

/**
 * Created by Liran on 11/02/2017.
 */

@Component({
  selector: "recorder",
  templateUrl: "recorder.component.html"
})
export class RecorderComponent implements OnInit {

  private recorder: any;
  private staticRecorder: any;

  public ngOnInit(): void {
    debugger;

    let config: any = {
      callback: () => {
        debugger;
        console.log("asdas");
      }
    };

    this.staticRecorder = require("recorderjs");

    let startUserMedia = (stream) => {
      let audio_context = new AudioContext;
      let input = audio_context.createMediaStreamSource(stream);

      this.recorder = new this.staticRecorder(input, config);
    }

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      console.log('No live audio input: ' + e);
    });



  }

  public record(): void {
    this.recorder.record();
  }

  public stopRecord(): void {
    this.recorder.stop();
    this.recorder.exportWAV((a,b,c) => {
      debugger;

      let fs = require("fs");
      let fileReader = new FileReader();
      fileReader.onload = function(r: Event) {
        debugger;
        fs.writeFileSync('test.wav', Buffer.from((r.currentTarget as FileReader).result as ArrayBuffer));
      };
      fileReader.readAsArrayBuffer(a);
      console.log("export file as wav by deafult");
    })
  }

  public saveFiles(): void {

  }
}

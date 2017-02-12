import {Component, OnInit, Input, AfterViewInit} from "@angular/core";

/**
 * Created by Liran on 11/02/2017.
 */

@Component({
  selector: "recorder",
  templateUrl: "recorder.component.html"
})
export class RecorderComponent implements OnInit {

  @Input("startRecordLabel") startRecordLabel: string;
  @Input() stopRecordLabel: string;
  public isRecording: boolean;
  private recorder: any;
  private staticRecorder: any;

  public ngOnInit(): void {

    this.isRecording = false;
    this.staticRecorder = require("recorderjs");

    let startUserMedia = (stream) => {
      let audio_context = new AudioContext;
      let input = audio_context.createMediaStreamSource(stream);

      this.recorder = new this.staticRecorder(input);
    };

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      console.log('No live audio input: ' + e);
    });
  }

  public record(): void {
    this.recorder.record();
    this.isRecording = true;
  }

  public stopRecord(): void {
    this.recorder.stop();
    this.isRecording = false;

    this.recorder.exportWAV((inputBlob) => {


      // let fs = require("fs");
      // let fileReader = new FileReader();
      // fileReader.onload = function(r: Event) {
      //
      //   fs.writeFileSync('test.wav', Buffer.from((r.currentTarget as FileReader).result as ArrayBuffer));
      // };
      // fileReader.readAsArrayBuffer(a);

      let blobToBase64 = (blob, callback) => {

        let reader = new FileReader();
        reader.onload = () => {

          let dataUrl = reader.result;
          let base64 = dataUrl.split(',')[1];
          callback(base64);
        };
        reader.readAsDataURL(blob);
      };

      blobToBase64(inputBlob, (base64Blob) => {

        let buf = new Buffer(base64Blob, "base64");
        let fs = require("fs");
        fs.writeFile("temp/test.wav", buf, (err) => {

          if(err) {
            console.log(err);
          } else {
            // Show client a message that record has been succeeded
            console.log("Success");
          }
        })
      });


      console.log("export file as wav by deafult");
    })
  }
}

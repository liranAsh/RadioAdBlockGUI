import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {SavedFrequency, FrequenciesService} from "../../services/frequencies.service";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {SongsService} from "../../services/songs.service";
import {Song} from "../../models/Song";
/**
 * Created by Liran on 11/02/2017.
 */
@Component({

  templateUrl: "./songs.component.html"
})
export class SongsComponent implements OnInit {

  private songs: Song[];
  @ViewChild("fileUploadInput") public fileUploadInput: ElementRef;

  constructor(private songsService: SongsService,
              private router: Router) {}

  public ngOnInit(): void {

    this.songsService.getSongs().then((savedSongs: Song[]) => {
      this.songs = (savedSongs.length > 0) ? savedSongs.concat([]) : [];
    });

    this.fileUploadInput.nativeElement.addEventListener("change", (e: Event) => {
      let fileList: FileList = (e.currentTarget as any).files;

      for (let i: number = 0; i < fileList.length; i++) {
        let file: File = fileList[i];
        this.songs.push(new Song(file.name, (file as any).path));
      }
    })
  }

  public clickUpload(): void {
    this.fileUploadInput.nativeElement.click();
  }

  public removeFreq(index: number) {
    this.songs.splice(index, 1);
  }

  public saveAndNavigate() {
    this.songsService.save(this.songs);
    this.router.navigate(["management"]);
  }
}

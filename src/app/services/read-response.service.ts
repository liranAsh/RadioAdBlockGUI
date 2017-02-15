import {Injectable, EventEmitter} from "@angular/core";
import {MaofResponse} from "../interfaces/maof-interfaces";
import {ManageJsonFileService, JsonFileResult} from "./manage-json-file.service";
import {AppConfig} from "../../../config/app-config";
/**
 * Created by huser on 15/02/2017.
 */

@Injectable()
export class ReadResponseService {

    // Event for notify changes
    public onMaofJsonResponseEmit: EventEmitter<MaofResponse>;

    constructor(private manageJsonFile: ManageJsonFileService) {

        this.onMaofJsonResponseEmit = new EventEmitter<MaofResponse>();
        setInterval(() => this.readJsonAndEmit(), 1000);
    }

    private readJsonAndEmit(): void {

        this.manageJsonFile.readJsonFile(AppConfig.RESPONSE_PATH).then((response: JsonFileResult) => {

            if (response.isSuccess) {
                this.onMaofJsonResponseEmit.emit(response.res);
            }
        });
    }
}
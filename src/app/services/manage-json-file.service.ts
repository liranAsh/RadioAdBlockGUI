/**
 * Created by huser on 14/02/2017.
 */
import {Injectable} from "@angular/core";
import ErrnoException = NodeJS.ErrnoException;

export interface JsonFileResult {
    isSuccess: boolean;
    res: any;
}

@Injectable()
export class ManageJsonFileService {

    private fs = require("fs");

    /**
     * Write file and then resolve function with output "isSuccess"
     * @param filename
     * @param data
     */
    public writeToJson(filename: string, data: string): Promise<boolean> {
        return new Promise<boolean>(resolve => {

            let isSuccess: boolean;
            this.fs.writeFile(filename, data, (err) => {
                if (err) {
                    console.log(err);
                    isSuccess = false;
                } else {
                    isSuccess = true;
                }

                resolve(isSuccess);
            });
        });
    }

    public readJsonFile(filename: string): Promise<JsonFileResult> {
        return new Promise<JsonFileResult>(resolve => {

            this.fs.readFile(filename, "utf8", (err: ErrnoException, data: Buffer) => {

                let result: JsonFileResult = {
                    isSuccess: false,
                    res: null
                };

                if (err) {
                    result.isSuccess = false;
                } else {
                    result.isSuccess = true;
                    result.res = JSON.parse(data.toString('utf8'));
                }

                resolve(result);
            });
        });
    }
}

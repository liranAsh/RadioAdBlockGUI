import {MatlabTypeEnum} from "../enums/MatlabType";
import {Injectable} from "@angular/core";
/**
 * Created by huser on 14/02/2017.
 */

interface Task {
    type: MatlabTypeEnum,
    pid: string
}

/**
 * This service managed matlab windows, it save the pid,
 * We assume only one type is running at the same time !!
 */
@Injectable()
export class ManageMatlabFilesService {

    private tasks: Task[];
    private exec;

    constructor() {
        this.tasks = [];
        this.exec = require("child_process").exec;
    }

    /**
     * After running matlab exe we search it in tasklist and add his pid to array for manage it future
     * @param matlabType
     */
    public addTask(matlabType: MatlabTypeEnum): Promise<any> {

        return new Promise<any>(resolve => {

            // Check if task allready running
            if (this.tasks.filter((task: Task) => task.type === matlabType).length > 0) {
                throw new Error("We can't run more than one matlab type algorithm");
            }

            // Search for all pids with the name MATLAB.EXE
            this.exec("tasklist", { cwd: '.' }, (error, stdout, stderr) => {

                if (error) {
                    console.log("There was an error when running tasklist");
                }

                let arrStrMatlabProccesses: string[] = stdout.match(/\bMATLAB.+K\b/g);
                let pids: string[] =
                    arrStrMatlabProccesses
                        .map((strMatlabProccess: string) => strMatlabProccess.match(/\d+/))
                        .reduce((a: string[], b: string[]) => a.concat(b));

                // Find all pids that not exists in tasks array
                let pidsInTasks: string[] = this.tasks
                    .filter((task: Task) => task.type === matlabType)
                    .map((task: Task) => task.pid);

                let pidsThatNotInOurTasks: string[] = pids.filter((pid: string) => pidsInTasks.indexOf(pid) === -1);

                // If we found more than one pid that we don't know we throw an error
                if (pidsThatNotInOurTasks.length > 1) {
                    throw new Error("There more than one pid of matlab of same type");
                }

                // If we don't found we throw an error
                if (pidsThatNotInOurTasks.length === 0) {
                    throw new Error("There no new pid of matlab");
                }

                // If we found only one pid then add it to task list
                this.tasks.push({type: matlabType, pid: pidsThatNotInOurTasks[0]});

                resolve();
            });
        });
    }

    /**
     * We assume that only one type running
     * @param matlabType
     */
    public killTask(matlabType: MatlabTypeEnum): Promise<any> {

        return new Promise<any>(resolve => {

            let foundTask: Task = this.tasks.find((task: Task) => task.type === matlabType);

            if (foundTask) {
                let pid: string = foundTask.pid;
                let command: string = "taskkill /pid " + foundTask.pid;
                this.exec(command, { cwd: '.' }, (error, stdout, stderr) => {
                    let index: number = this.tasks.findIndex((task: Task) => task.pid === pid);
                    this.tasks.splice(index, 1);
                    resolve();
                });
            } else {
                throw new Error("Task from type " + matlabType + " is not found! ");
            }
        });
    }
}
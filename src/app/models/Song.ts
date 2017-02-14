/**
 * Created by Liran on 11/02/2017.
 */
export class Song {
  public name: string;
  public path: string;
  public priority: number;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
}

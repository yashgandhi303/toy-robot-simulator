import { Injectable } from "@angular/core";
import { GLOBALS } from "../shared/globals";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  public static areValidCoordinates(r: number, c: number): boolean {
    return (
      r >= 0 && r <= GLOBALS.MAXROWS - 1 && c >= 0 && c <= GLOBALS.MAXCOLS - 1
    );
  }

  private _row: number = 0;
  get row(): number {
    return this._row;
  }
  set row(r: number) {
    this._row = r;
  }

  private _cols: number = 0;
  get col(): number {
    return this._cols;
  }
  set col(c: number) {
    this._cols = c;
  }
}

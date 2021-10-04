import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BoardService } from "src/app/services/board.service";
import { GLOBALS, Command, DIRECTION } from "src/app/shared/globals";

import { Robot } from "src/app/shared/robot";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  @Input("command") commandName: Command;
  @Output() commandExecuted = new EventEmitter();
  directionClass = "";
  XYDirectionStyle = {
    display: "block",
    left: "0%",
    top: "0%",
  };
  constructor() {}

  ngOnInit() {}
  rows: number[] = Array.from({ length: GLOBALS.MAXROWS }).map(
    (x, i) => GLOBALS.MAXROWS - 1 - i
  );
  cols: number[] = Array.from({ length: GLOBALS.MAXCOLS }).map((x, i) => i);
  static rx: number = -1;
  static ry: number = -1;
  ngOnChanges(changes: any) {
    if (this.commandName) {
      let r: Robot = Robot.getInstance();
      let m: string = r.mapCommand(this.commandName);
      this.XYDirectionStyle.top = r.top;
      this.XYDirectionStyle.left = r.left;
      switch (r.nose) {
        case DIRECTION.NORTH:
          this.directionClass = "North";
          break;

        case DIRECTION.EAST:
          this.directionClass = "East";
          break;

        case DIRECTION.SOUTH:
          this.directionClass = "South";
          break;

        case DIRECTION.WEST:
          this.directionClass = "West";
          break;
      }
      BoardComponent.rx = r.x;
      BoardComponent.ry = r.y;
      this.commandExecuted.emit({ msg: m });
    }
  }
  classMap(r: number, c: number) {
    if (r == BoardComponent.ry && c == BoardComponent.rx)
      return `${this.directionClass} has-robot`;
    return "no-robot";
  }
}

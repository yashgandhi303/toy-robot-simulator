import { GLOBALS, Command, COMMAND_DICT, DIRECTION } from "./globals";
import { IMoveAble } from "./interface/imove-able";

export class Robot implements IMoveAble {
  //Singleton? May be look for a better way in future
  x: number = -1;
  y: number = -1;
  nose: DIRECTION = DIRECTION.NONE;
  top: string = 80 + "%";
  left: string = 0 + "%";
  public static r: Robot;
  public static getInstance() {
    if (!Robot.r) {
      Robot.r = new Robot();
    }
    return Robot.r;
  }

  robotHasBeenPlaced = false;

  initialize() {
    this.x = this.y = -1;
    this.nose = DIRECTION.NONE;
  }

  public mapCommand(command: Command): string {
    if (command) {
      if (this.robotHasBeenPlaced) {
        switch (command.cmd) {
          case COMMAND_DICT.LEFT:
            this.rotate(GLOBALS.LEFT);
            return GLOBALS.SYS_MSG[COMMAND_DICT.LEFT];
          case COMMAND_DICT.RIGHT:
            this.rotate(GLOBALS.RIGHT);
            return GLOBALS.SYS_MSG[COMMAND_DICT.RIGHT];
          case COMMAND_DICT.REPORT:
            return this.report();
          case COMMAND_DICT.MOVE:
            return this.move();
          default:
            return GLOBALS.SYS_MSG[GLOBALS.UNKNOWN_COMMAND];
        }
      }
      if (!this.robotHasBeenPlaced && command.cmd == COMMAND_DICT.PLACE) {
        return this.placeValidate(command.args);
      } else return GLOBALS.SYS_MSG[GLOBALS.PLACEMENT_CONSTRAINT];
    }
    return GLOBALS.SYS_MSG[GLOBALS.UNKNOWN_COMMAND];
  }

  rotate(direction: number): void {
    //Will just move the direction
    //direction == -1 for LEFT
    //direction == 1 for RIGHT

    this.nose = (DIRECTION.COUNT + this.nose + direction) % DIRECTION.COUNT;
  }

  move(): string {
    //Will just move the position based on direction
    let validation: boolean = false;

    switch (this.nose) {
      case DIRECTION.NORTH:
        //increase y
        validation = this.validate(this.x, this.y + 1);
        this.y = validation ? this.y + 1 : this.y;
        if (this.y > 0) {
          this.top = 80 - this.y * 20 + "%";
        } else {
          this.top = "80%";
        }
        break;

      case DIRECTION.EAST:
        //increase x
        validation = this.validate(this.x + 1, this.y);
        this.x = validation ? this.x + 1 : this.x;
        if (this.x < 80) {
          this.left = this.x * 20 + "%";
        } else {
          this.left = "0%";
        }
        break;

      case DIRECTION.SOUTH:
        //decrease y
        validation = this.validate(this.x, this.y - 1);
        this.y = validation ? this.y - 1 : this.y;
        if (this.y < 80) {
          this.top = 80 - this.y * 20 + "%";
        } else {
          this.top = "80%";
        }
        break;

      case DIRECTION.WEST:
        //decrease x
        validation = this.validate(this.x - 1, this.y);
        this.x = validation ? this.x - 1 : this.x;
        if (this.x > 0) {
          this.left = this.x * 20 + "%";
        } else {
          this.left = "0%";
        }
        break;
    }
    return validation
      ? GLOBALS.SYS_MSG[COMMAND_DICT.MOVE]
      : GLOBALS.SYS_MSG[GLOBALS.UNKNOWN_COMMAND];
  }

  private setDirection(f: string) {
    switch (f.toLowerCase()) {
      case "n":
        this.nose = DIRECTION.NORTH;
        break;

      case "e":
        this.nose = DIRECTION.EAST;
        break;

      case "s":
        this.nose = DIRECTION.SOUTH;
        break;

      case "w":
        this.nose = DIRECTION.WEST;
        break;
    }
  }

  private validate(x: number, y: number): boolean {
    return x >= 0 && x < GLOBALS.MAXROWS && y >= 0 && y < GLOBALS.MAXCOLS;
  }

  private placeValidate(args: string[]): string {
    //console.log(args);
    //debugger;
    if (
      args.length == 3 &&
      this.validate(+args[0], +args[1]) &&
      args[2][0].toLowerCase().match("[nesw]")
    ) {
      if (parseInt(args[0]) > 0) {
        this.left = 20 * parseInt(args[0]) + "%";
      }
      if (parseInt(args[1]) > 0) {
        this.top = 80 - 20 * parseInt(args[1]) + "%";
      }
      this.place(+args[0], +args[1]);
      this.setDirection(args[2][0]);
      this.robotHasBeenPlaced = true;
      return this.report();
    }
    return GLOBALS.SYS_MSG[GLOBALS.VALIDATION_CONSTRAINT];
  }

  private place(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private report(): string {
    //Will report
    let r: string = `Output: ${this.x}, ${this.y}, ${DIRECTION[this.nose]}`;
    return r;
  }
}

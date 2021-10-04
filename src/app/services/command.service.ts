import { Injectable } from "@angular/core";
import { IParser } from "src/app/shared/interface/iparser";
import { Command, COMMAND_DICT } from "../shared/globals";
@Injectable({
  providedIn: "root",
})
export class CommandService implements IParser {
  constructor() {}
  public parse(inputCommand: string): Command {
    //This method is actuall public static
    let command: Command = new Command();
    let cmd: string = inputCommand.trim().split(" ")[0]; //this is bad code :todo
    command.cmd = COMMAND_DICT[cmd] || COMMAND_DICT.NOT_VALID;
    return command;
  }
}

import { Component, OnInit } from "@angular/core";
import { COMMAND_DICT, GLOBALS } from "src/app/shared/globals";

@Component({
  selector: "app-manual",
  templateUrl: "./manual.component.html",
  styleUrls: ["./manual.component.scss"],
})
export class ManualComponent implements OnInit {
  title = "Command Manual";
  messages: string[] = [];
  constructor() {
    for (let c in COMMAND_DICT) {
      if (c == COMMAND_DICT[COMMAND_DICT.NOT_VALID]) continue;
      let m = GLOBALS.COMMAND_TIPS[c] ? GLOBALS.COMMAND_TIPS[c] : "";
      if (m) this.messages.push(COMMAND_DICT[c] + " => " + m);
    }
  }

  ngOnInit() {}
}

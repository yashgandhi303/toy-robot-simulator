import { Component } from "@angular/core";
import { Command } from "../shared/globals";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  command: Command;
  uilog: string = "";
  constructor() {}
  onCommandReceived(event: any) {
    if (event.msg) {
      this.uilog = event.msg;
    }
    if (event.value) {
      this.command = event.value;
    }
  }
}

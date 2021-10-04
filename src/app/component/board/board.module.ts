import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { BoardComponent } from "./board.component";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [BoardComponent],
  exports: [BoardComponent],
})
export class BoardComponentModule {}

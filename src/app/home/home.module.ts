import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { BoardComponentModule } from "../component/board/board.module";
import { ManualComponentModule } from "../component/manual/manual.module";
import { CommandComponentModule } from "../component/command/command.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BoardComponentModule,
    CommandComponentModule,
    ManualComponentModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}

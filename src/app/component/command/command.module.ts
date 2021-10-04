import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { CommandComponent } from "./command.component";
import { AutoGrowDirectiveModule } from "src/app/directive/auto-grow.module";

@NgModule({
  imports: [CommonModule, IonicModule, AutoGrowDirectiveModule],
  declarations: [CommandComponent],
  exports: [CommandComponent],
})
export class CommandComponentModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AutoGrowDirective } from "./auto-grow.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [AutoGrowDirective],
  exports: [AutoGrowDirective],
})
export class AutoGrowDirectiveModule {}

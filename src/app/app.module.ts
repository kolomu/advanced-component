import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TooltipComponent, TooltipContainerDirective } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { ForTooltipComponent } from './for-tool-tip/for-tool-tip.component';

@NgModule({
  declarations: [
    AppComponent,
    TooltipComponent,
    TooltipDirective,
    TooltipContainerDirective,
    ForTooltipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ TooltipComponent, ForTooltipComponent]
})
export class AppModule { }

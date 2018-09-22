import { Component } from '@angular/core';
import { ForTooltipComponent } from './for-tool-tip/for-tool-tip.component';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
  <p tooltip="Tooltip from text">Tooltip from text</p>

  <p [tooltip]="template">Tooltip from TemplateRef</p>

  <ng-template #template>
    <span style="color: lawngreen;">Tooltip from TemplateRef</span>
  </ng-template>

  <p [tooltip]="component">Tooltip from Component</p>


</div>
  `
})
export class AppComponent {
  component = ForTooltipComponent;
}

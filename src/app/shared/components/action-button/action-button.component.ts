import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'button[app-action-button]',
  standalone: true,
  imports: [MatIcon],
  template: `
    <mat-icon [fontIcon]="icon()" />
  `,
  styleUrl: './action-button.component.scss',
  host: {
    '[class.negative]': 'negative()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonComponent {
  icon = input.required<string>();
  active = input(false, { transform: booleanAttribute });
  negative = input(false, { transform: booleanAttribute });
}

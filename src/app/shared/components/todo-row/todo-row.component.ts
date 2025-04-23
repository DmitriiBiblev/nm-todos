import { booleanAttribute, ChangeDetectionStrategy, Component, input, InputSignalWithTransform } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TimerComponent } from '../timer';

@Component({
  selector: 'tr[app-todo-row]',
  standalone: true,
  imports: [MatIcon, TimerComponent],
  templateUrl: './todo-row.component.html',
  styleUrl: './todo-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoRowComponent {
  isToday: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  title: string = 'Title TTitle Title Title Title Title Title';
}

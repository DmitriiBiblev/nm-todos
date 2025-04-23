import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignalWithTransform,
  Signal
} from '@angular/core';
import { tableSettings } from '../../data';
import { TableSetting, Todo } from '../../interfaces';
import { TableComponent } from '../table';
import { TodoComponent } from '../todo';
import { TodoRowComponent } from '../todo-row';

@Component({
  selector: 'app-todo-block',
  standalone: true,
  imports: [
    TableComponent,
    TodoRowComponent,
    TodoComponent
  ],
  templateUrl: './todo-block.component.html',
  styleUrl: './todo-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoBlockComponent {
  isToday: InputSignalWithTransform<boolean, unknown> = input(false, { alias: 'today', transform: booleanAttribute });
  todos = input.required<Todo[]>();

  protected readonly title = computed(() => this.isToday() ? 'Today' : ' Other days');
  protected readonly tableSettings: Signal<TableSetting[]> = computed(() => tableSettings(this.isToday()));
}

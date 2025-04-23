import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignalWithTransform,
  Signal
} from '@angular/core';
import { TableSetting } from '../../interfaces';
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

  protected readonly tableSettings: Signal<TableSetting[]> = computed(() => ([
    { prop: 'title' },
    { name: 'Created At', prop: 'createdAt', width: '150px' },
    { name: this.isToday() ? 'Time left' : 'Expiration', prop: 'expiredAt', width: '150px' },
    { prop: 'favorite', width: '36px' },
    { prop: 'actions', width: '36px' }
  ]));
}

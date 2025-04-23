import { DatePipe } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Debounced } from '../../decorators';
import { Todo } from '../../interfaces';
import { TodosService } from '../../services';
import { TimerComponent } from '../timer';

@Component({
  selector: 'tr[app-todo-row]',
  standalone: true,
  imports: [MatIcon, TimerComponent, DatePipe],
  templateUrl: './todo-row.component.html',
  styleUrl: './todo-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoRowComponent {
  readonly #todosService = inject(TodosService);

  todo: InputSignal<Todo> = input.required();
  isToday: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  @Debounced()
  protected handleToggleFavorite(): void {
    this.#todosService.toggleFavorite(this.todo().id);
  }

  protected handleDeleteTodo(): void {
    this.#todosService.delete(this.todo().id)
  }
}

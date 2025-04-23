import { DatePipe } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Debounced } from '../../decorators';
import { Todo } from '../../interfaces';
import { TodosService } from '../../services';
import { ActionButtonComponent } from '../action-button';
import { DeleteTodoPopupComponent } from '../delete-todo-popup';
import { TimerComponent } from '../timer';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    DatePipe,
    TimerComponent,
    ActionButtonComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  readonly #todosService = inject(TodosService);
  readonly #dialog = inject(MatDialog);
  readonly #destroyRef = inject(DestroyRef);

  isToday: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  todo: InputSignal<Todo> = input.required();

  @Debounced()
  protected handleToggleFavorite(): void {
    this.#todosService.toggleFavorite(this.todo().id);
  }

  protected handleDeleteTodo(): void {
    this.#dialog.open(DeleteTodoPopupComponent, {
      data: this.todo().title
    })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((isConfirmed?: boolean) => {
        if (!isConfirmed) return;
        this.#todosService.delete(this.todo().id);
      });
  }
}

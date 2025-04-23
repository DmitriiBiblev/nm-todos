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
import { MatIcon } from '@angular/material/icon';
import { Debounced } from '../../decorators';
import { Todo } from '../../interfaces';
import { TodosService } from '../../services';
import { DeleteTodoPopupComponent } from '../delete-todo-popup';
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
  readonly #dialog = inject(MatDialog);
  readonly #destroyRef = inject(DestroyRef);

  todo: InputSignal<Todo> = input.required();
  isToday: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

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

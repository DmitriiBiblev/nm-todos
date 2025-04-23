import { HeaderPageComponent, Todo, TodoBlockComponent, TodosService } from '#shared';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal } from '@angular/core';

@Component({
  selector: 'app-favorite-todo',
  standalone: true,
  imports: [
    TodoBlockComponent,
    HeaderPageComponent
  ],
  templateUrl: './favorite-todo.component.html',
  styleUrl: './favorite-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteTodoComponent implements OnInit {
  readonly #todosService = inject(TodosService);

  protected readonly isLoading = this.#todosService.isLoading;
  protected readonly todos = this.#todosService.favoritesTodos;

  protected readonly todayTodos: Signal<Todo[]> = computed(() => this.todos().today);
  protected readonly otherTodos: Signal<Todo[]> = computed(() => this.todos().other);
  protected readonly isEmptyTodoLists: Signal<boolean> = computed(() => !this.todayTodos().length && !this.otherTodos().length);

  ngOnInit(): void {
    if (!this.isLoading()) return;
    this.#todosService.initialTodos();
  }
}

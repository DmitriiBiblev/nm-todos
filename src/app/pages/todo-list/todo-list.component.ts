import { HeaderPageComponent, Todo, TodoBlockComponent, TodosService } from '#shared';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoBlockComponent,
    HeaderPageComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  readonly #todosService = inject(TodosService);

  protected readonly isLoading = this.#todosService.isLoading;
  protected readonly todos = this.#todosService.allTodos;

  protected readonly todayTodos: Signal<Todo[]> = computed(() => this.todos().today);
  protected readonly otherTodos: Signal<Todo[]> = computed(() => this.todos().other);
  protected readonly isEmptyTodoLists: Signal<boolean> = computed(() => !this.todayTodos().length && !this.otherTodos().length);

  ngOnInit(): void {
    if (!this.isLoading()) return;
    this.#todosService.initialTodos();
  }
}

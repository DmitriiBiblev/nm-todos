import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { GroupedTodos, Todo } from '../../interfaces';
import { TodosService } from '../../services';
import { LoaderComponent } from '../loader';
import { TodoBlockComponent } from '../todo-block';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [
    LoaderComponent,
    TodoBlockComponent
  ],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosPageComponent implements OnInit {
  readonly #todosService = inject(TodosService);

  todos = input.required<GroupedTodos>();

  protected readonly isLoading = this.#todosService.isLoading;

  protected readonly todayTodos: Signal<Todo[]> = computed(() => this.todos().today);
  protected readonly otherTodos: Signal<Todo[]> = computed(() => this.todos().other);
  protected readonly isEmptyTodoLists: Signal<boolean> = computed(() => !this.todayTodos().length && !this.otherTodos().length);

  ngOnInit(): void {
    if (!this.isLoading()) return;
    this.#todosService.initialTodos();
  }
}

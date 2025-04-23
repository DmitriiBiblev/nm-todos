import { LAST_TODO_ID_KEY, Todo, TODO_KEY, TODO_SCHEMA } from '#shared';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { isToday } from 'date-fns';
import { delay, tap } from 'rxjs';

interface GroupedTodos {
  today: Todo[];
  other: Todo[];
}

const INITIAL_GROUPED_TODOS: GroupedTodos = {
  today: [],
  other: []
};

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  readonly #storageMap = inject(StorageMap);

  isLoading: WritableSignal<boolean> = signal(true);
  todos: WritableSignal<Todo[]> = signal([]);
  lastTodoId: WritableSignal<number | null> = signal(null);

  allTodos = computed(() => this.todos().reduce(this.#groupTodo, INITIAL_GROUPED_TODOS));
  favoritesTodos = computed(() => this.todos().reduce((grouped: GroupedTodos, todo: Todo) => {
    if (!todo.isFavorite) return grouped;
    return this.#groupTodo(grouped, todo);
  }, INITIAL_GROUPED_TODOS));

  initialLastTodoId(): void {
    this.#storageMap.get<number>(LAST_TODO_ID_KEY, { type: 'number' })
      .subscribe((lastTodoId?: number) => this.lastTodoId.set(lastTodoId || 0));
  }

  initialTodos(): void {
    this.#storageMap.get<Todo[]>(TODO_KEY, TODO_SCHEMA)
      .pipe(
        tap(() => this.isLoading.set(true)),
        delay(400)
      )
      .subscribe((todos?: Todo[]) => {
        this.todos.set(todos || []);
        this.isLoading.set(false);
      });
  }

  create(todo: Todo): void {
    const id: number = this.lastTodoId()! + 1;

    this.todos.update((todos: Todo[]) => [...todos, { ...todo, id }]);
    this.#storageMap.set(LAST_TODO_ID_KEY, id);
    this.#updateStorage();
  }

  toggleFavorite(id: number): void {
    this.todos.update((todos: Todo[]) => todos.map((todo: Todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, isFavorite: !todo.isFavorite };
    }));
    this.#updateStorage();
  }

  delete(todoId: number): void {
    this.todos.update((todos: Todo[]) => todos.filter(({ id }) => todoId !== id));
    this.#updateStorage();
  }

  #groupTodo(grouped: GroupedTodos, todo: Todo): GroupedTodos {
    return isToday(todo.expiredAtDate)
      ? { ...grouped, today: [...grouped.today, todo] }
      : { ...grouped, other: [...grouped.other, todo] };
  }

  #updateStorage(): void {
    this.#storageMap.set(TODO_KEY, this.todos())
      .pipe(delay(400))
      .subscribe();
  }
}

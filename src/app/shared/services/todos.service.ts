import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { isToday } from 'date-fns';
import { delay, tap } from 'rxjs';
import { INITIAL_GROUPED_TODOS, TODO_KEY, TODO_SCHEMA } from '../data';
import { CreateTodo, GroupedTodos, Todo } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  readonly #storageMap = inject(StorageMap);

  isLoading: WritableSignal<boolean> = signal(true);
  todos: WritableSignal<Todo[]> = signal([]);

  allTodos = computed(() => this.todos().reduce(this.#groupTodo, INITIAL_GROUPED_TODOS));
  favoritesTodos = computed(() => this.todos().reduce((grouped: GroupedTodos, todo: Todo) => {
    if (!todo.isFavorite) return grouped;
    return this.#groupTodo(grouped, todo);
  }, INITIAL_GROUPED_TODOS));

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

  create({ expiredAtDate, ...todo }: CreateTodo): void {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      expiredAtDate: expiredAtDate.toISOString(),
      isFavorite: false,
      ...todo,
    };

    this.todos.update((todos: Todo[]) => [...todos, newTodo]);
    this.#updateStorage();
  }

  toggleFavorite(id: string): void {
    this.todos.update((todos: Todo[]) => todos.map((todo: Todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, isFavorite: !todo.isFavorite };
    }));
    this.#updateStorage();
  }

  delete(todoId: string): void {
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

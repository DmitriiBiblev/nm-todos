import { HeaderPageComponent, TodosPageComponent, TodosService } from '#shared';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    HeaderPageComponent,
    TodosPageComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  readonly #todosService = inject(TodosService);

  protected readonly todos = this.#todosService.allTodos;
}

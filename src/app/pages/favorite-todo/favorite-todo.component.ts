import { HeaderPageComponent, TodosPageComponent, TodosService } from '#shared';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-favorite-todo',
  standalone: true,
  imports: [
    HeaderPageComponent,
    TodosPageComponent
  ],
  templateUrl: './favorite-todo.component.html',
  styleUrl: './favorite-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteTodoComponent {
  readonly #todosService = inject(TodosService);

  protected readonly todos = this.#todosService.favoritesTodos;
}

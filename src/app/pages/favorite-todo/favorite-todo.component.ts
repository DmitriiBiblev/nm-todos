import { TodoBlockComponent } from '#shared';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favorite-todo',
  standalone: true,
  imports: [
    TodoBlockComponent
  ],
  templateUrl: './favorite-todo.component.html',
  styleUrl: './favorite-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteTodoComponent {

}

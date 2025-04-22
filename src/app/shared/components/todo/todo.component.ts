import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Todo } from '../../interfaces';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  todo: InputSignal<Todo | undefined> = input();
}

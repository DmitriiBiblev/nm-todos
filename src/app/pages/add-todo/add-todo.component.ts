import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {

}

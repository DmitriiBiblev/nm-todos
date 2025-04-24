import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionButtonComponent } from '../action-button';
import { TimerComponent } from '../timer';
import { TodoRowComponent } from '../todo-row';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    DatePipe,
    TimerComponent,
    ActionButtonComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent extends TodoRowComponent {
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableComponent } from '../table';

@Component({
  selector: 'app-todo-block',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './todo-block.component.html',
  styleUrl: './todo-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoBlockComponent {

}

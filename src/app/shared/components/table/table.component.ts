import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoComponent } from '../todo';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TodoComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

}

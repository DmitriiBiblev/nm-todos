import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-todo-popup',
  standalone: true,
  templateUrl: './delete-todo-popup.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteTodoPopupComponent {
  protected readonly title: string = inject(DIALOG_DATA);
}

import { CreateTodo, HeaderPageComponent, TodosService } from '#shared';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepicker,
    MatDatepickerInput,
    NgxMaterialTimepickerModule,
    MatButton,
    MatIcon,
    RouterLink,
    ReactiveFormsModule,
    HeaderPageComponent
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {
  readonly #router = inject(Router);
  readonly #formBuilder = inject(FormBuilder);
  readonly #todosService = inject(TodosService);

  protected previousUrl: string | null = null;
  protected form = this.#formBuilder.nonNullable.group({
    title: '',
    expiredAtDate: new Date(),
    expiredAtTime: ''
  });

  constructor() {
    const navigation = this.#router.getCurrentNavigation();

    this.previousUrl = navigation?.previousNavigation?.finalUrl?.toString() || '/list';
  }

  protected handleCreate(): void {
    this.#todosService.create(this.form.value as CreateTodo);
  }
}

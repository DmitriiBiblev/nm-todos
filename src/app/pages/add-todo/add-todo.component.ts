import { CreateTodo, HeaderPageComponent, TodosService } from '#shared';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { isBefore, parse } from 'date-fns';
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
    HeaderPageComponent,
    MatError
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
  protected readonly minDate: Date = new Date();
  protected form = this.#formBuilder.nonNullable.group({
      title: '',
      expiredAtDate: new Date(),
      expiredAtTime: '',
    },
    {
      validators: this.#timeValidator()
    }
  );

  constructor() {
    const navigation = this.#router.getCurrentNavigation();

    this.previousUrl = navigation?.previousNavigation?.finalUrl?.toString() || '/list';
  }

  protected handleCreate(): void {
    const { expiredAtDate, expiredAtTime } = this.form.value;

    if (this.#isTimeInPast(expiredAtDate!, expiredAtTime!)) {
      this.form.controls.expiredAtTime.setErrors({ invalidTime: true });
    } else {
      this.#todosService.create(this.form.value as CreateTodo);
    }
  }

  #timeValidator() {
    return (group: AbstractControl) => {
      const date = group.get('expiredAtDate')?.value;
      const timeControl = group.get('expiredAtTime');
      const time = timeControl?.value;

      if (this.#isTimeInPast(date, time)) {
        timeControl?.setErrors({ invalidTime: true });
      } else {
        timeControl?.setErrors(null);
      }
      return null;
    };
  }

  #isTimeInPast(date: Date, time: string): boolean {
    const selectedTime = parse(time, 'h:mm a', date);

    return isBefore(selectedTime, new Date());
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect, ElementRef,
  inject,
  input,
  Renderer2, signal,
  viewChild
} from '@angular/core';
import { intervalToDuration, isBefore } from 'date-fns';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: `
    <span #timer></span>
  `,
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements AfterViewInit {
  readonly #renderer = inject(Renderer2);

  timerRef = viewChild.required('timer', { read: ElementRef });

  expiredAt = input.required<string>();

  readonly #now = signal(new Date());

  constructor() {
    effect(() => {
      const current = this.#now();

      if (isBefore(this.expiredAt(), current)) {
        this.#renderer.setProperty(this.timerRef().nativeElement, 'textContent', 'Time is up!');
      } else {
        const duration = intervalToDuration({ start: current, end: this.expiredAt() });
        const parts: string[] = [];

        if (duration.hours) parts.push(`${ duration.hours }h`);
        if (duration.minutes) parts.push(`${ duration.minutes }m`);
        parts.push(`${ duration.seconds ?? 0 }s`);

        const display = parts.join(' ');

        this.#renderer.setProperty(this.timerRef().nativeElement, 'textContent', display);

        if (!duration.hours) {
          this.#renderer.setStyle(this.timerRef().nativeElement, 'color', 'red');
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.#startTimer();
  }

  #startTimer() {
    const tick = () => {
      this.#now.set(new Date());

      if (isBefore(this.expiredAt(), this.#now())) return;
      setTimeout(tick, 1000);
    };

    tick();
  }
}

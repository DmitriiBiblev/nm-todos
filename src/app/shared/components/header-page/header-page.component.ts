import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-header-page',
  standalone: true,
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderPageComponent {
  titleName: InputSignal<string> = input.required();
}

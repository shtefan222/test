import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
// передаємо дані від сhild компонента до батьківського
  @Output() outEnterName = new EventEmitter<string>(); 

  enterName(nameInput: HTMLInputElement) {
    console.log("nameInput", nameInput.value)
    this.outEnterName.emit(nameInput.value);
    nameInput.value = ''; // щоб очищалось поле
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, HostListener, OnInit, Signal, WritableSignal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentComponent } from './input/student/student.component';
import { Student } from './models/student-model';
import { InputComponent } from './input/input/input.component';
import { CommonModule } from '@angular/common';
import {PaginationComponent} from "./input/pagination/pagination.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentComponent, InputComponent, CommonModule, PaginationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = "test";
  windowWidth!: number;

  constructor(private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.dynamicSignals();
    this.doSomething();

    this.windowWidth = window.innerWidth;
  }

  // input output
  students: Student[] = [
    { id: 1, name: 'Ivan' },
    { id: 2, name: 'Bill' },
    { id: 3, name: 'John' },
    { id: 4, name: 'Petr' },
  ];

  addName(name: string) {
    this.students.push({
      name: name,
      id: this.students.length + 1
    })
  }




  @HostListener('window:resize', ['$event']) // Відслідковуємо подію зміни розміру вікна
  onResize(event: { target: { innerWidth: number; }; }) {
    this.windowWidth = event.target.innerWidth; // Оновлюємо значення ширини вікна
  }
  text = 'Hello, world!';
  isHighlighted = false;

  @HostBinding('class.highlight') get highlightClass() {
    return this.isHighlighted; // Додає або видаляє клас 'highlight' з елемента в залежності від значення isHighlighted
  }

  @HostBinding('attr.role') role = 'button'; // Додає атрибут 'role' зі значенням 'button' до компонента

  toggleClass() {
    // console.log("toggle clicked")
    this.isHighlighted = !this.isHighlighted;
    this.cdr.detectChanges();
  }



  isDisabled = true;

  @HostBinding('class.disabled')
  get disabledClasses() {


    return this.isDisabled;
  }




  doSomething(): void {
    const count: WritableSignal<number> = signal(0);
    const doubleCount: Signal<number> = computed(() => count() * 2);
    // doubleCount.set(3); помилка бо це тільки read-only
    // Signals are getter functions - calling them reads their value.
    console.log('The count is: ' + count());
    console.log('The count is: ' + doubleCount());
    count.set(3);
    console.log('The count is: ' + count());
    console.log('The count is: ' + doubleCount());
    count.update(value => value + 1);
    console.log('The count is: ' + count());
    console.log('The count is: ' + doubleCount());
  }


  // Computed signal dependencies are dynamic
  dynamicSignals()  {
    const showCount = signal(false);
    const count = signal(0);
    const conditionalCount = computed(() => {
      if (showCount()) {
        console.log(`The count is ${count()}.`)
        return `The count is ${count()}.`;
      } else {

        console.log('Nothing to see here!');
        return 'Nothing to see here!';
      }
    });

  }


}

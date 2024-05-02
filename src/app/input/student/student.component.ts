import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Student } from '../../models/student-model';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent implements OnInit {

    @Input() student!: Student;


  ngOnInit(): void {
   
  }

}

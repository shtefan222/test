import { CommonModule } from '@angular/common';
import {Component, computed, EventEmitter, input, Input, OnInit, Output} from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
// Замість цього
  // @Input({required: true}) currentPage!: number;
  // @Input() limit: number = 0;
  // @Input() total: number = 20;

  // signal
  currentPage = input.required<number>()
  total = input.required<number>()
  limit = input.required<number>()

  @Output() changePage = new EventEmitter<number>()
  // замість
  // pages: number[] = [];
  pages = computed(() => {
    const pagesCount = Math.ceil(this.total() / this.limit());
    return  this.range(1, pagesCount)
  })



  ngOnInit(): void {

  }

  range(start: number, end: number): number[] {
    return [...Array(end - start).keys()].map((el) => el + start);
  }

}

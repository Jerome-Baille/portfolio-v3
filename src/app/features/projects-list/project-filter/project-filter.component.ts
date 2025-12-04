import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-filter.component.html',
  styleUrl: './project-filter.component.css'
})
export class ProjectFilterComponent {

  @Input() categories: string[] = [];
  @Input() selectedCategory: string | null = null;

  @Output() categoryChange = new EventEmitter<string | null>();

  onSelect(category: string | null) {
    this.categoryChange.emit(category);
  }
}

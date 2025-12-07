import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project-filter',
  standalone: true,
  imports: [TranslatePipe],
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

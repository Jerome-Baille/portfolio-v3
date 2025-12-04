import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-tags.component.html',
  styleUrl: './project-tags.component.css'
})
export class ProjectTagsComponent {

  @Input() tags: string[] = [];

}

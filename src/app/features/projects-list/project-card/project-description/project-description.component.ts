import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.css'
})
export class ProjectDescriptionComponent {

  @Input() description = '';

}

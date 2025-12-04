import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFormats } from '../../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-project-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-image.component.html',
  styleUrl: './project-image.component.css'
})
export class ProjectImageComponent {
  @Input() mockups: ImageFormats[] | undefined;
  @Input() screenshot: ImageFormats | undefined;
  @Input() title = '';
}

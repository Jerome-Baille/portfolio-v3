import { Component, Input, Signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-project-detail-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail-gallery.component.html',
  styleUrl: './project-detail-gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailGalleryComponent {
  @Input({ required: true }) project!: Signal<Project | undefined>;
}

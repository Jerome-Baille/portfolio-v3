import { Component, Input, Signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-project-detail-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail-description.component.html',
  styleUrl: './project-detail-description.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailDescriptionComponent {
  @Input({ required: true }) project!: Signal<Project | undefined>;
}

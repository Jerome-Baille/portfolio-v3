import { Component, Input, Signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-project-detail-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail-tech-stack.component.html',
  styleUrl: './project-detail-tech-stack.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailTechStackComponent {
  @Input({ required: true }) project!: Signal<Project | undefined>;
}

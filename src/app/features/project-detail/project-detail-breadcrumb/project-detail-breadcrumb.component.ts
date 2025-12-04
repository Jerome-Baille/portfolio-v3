import { Component, Input, Signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Project } from '../../../shared/interfaces/project.interface';


@Component({
  selector: 'app-project-detail-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './project-detail-breadcrumb.component.html',
  styleUrl: './project-detail-breadcrumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailBreadcrumbComponent {
  @Input({ required: true }) project!: Signal<Project | undefined>;
}

import { Component, Input, Signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Project } from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-project-detail-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './project-detail-header.component.html',
  styleUrl: './project-detail-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailHeaderComponent {
  @Input({ required: true }) project!: Signal<Project | undefined>;

}

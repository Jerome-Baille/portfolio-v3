import { Component, Input, Signal, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../../shared/interfaces/project.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project-detail-description',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './project-detail-description.component.html',
  styleUrl: './project-detail-description.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailDescriptionComponent {
  @Input({ required: true }) project!: Signal<Project | undefined>;
}

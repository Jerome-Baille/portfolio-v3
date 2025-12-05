import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Project } from '../../../shared/interfaces/project.interface';
import { ProjectImageComponent } from './project-image/project-image.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import { ProjectTagsComponent } from './project-tags/project-tags.component';
import { ProjectLinksComponent } from './project-links/project-links.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterModule, ProjectImageComponent, ProjectDescriptionComponent, ProjectTagsComponent, ProjectLinksComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {

  @Input() project!: Project;

}

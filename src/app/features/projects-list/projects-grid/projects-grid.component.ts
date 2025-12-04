import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../shared/interfaces/project.interface';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-projects-grid',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects-grid.component.html',
  styleUrl: './projects-grid.component.css'
})
export class ProjectsGridComponent {

  @Input() projects: Project[] = [];

  trackById(_: number, item: Project) {
    return item.id;
  }

}

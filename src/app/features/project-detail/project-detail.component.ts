import { Component, OnInit, signal, inject } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project } from '../../shared/interfaces/project.interface';
import { switchMap } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { ProjectDetailHeaderComponent } from "./project-detail-header/project-detail-header.component";
import { ProjectDetailGalleryComponent } from './project-detail-gallery/project-detail-gallery.component';
import { ProjectDetailDescriptionComponent } from './project-detail-description/project-detail-description.component';
import { ProjectDetailTechStackComponent } from './project-detail-tech-stack/project-detail-tech-stack.component';
import { ProjectDetailBreadcrumbComponent } from "./project-detail-breadcrumb/project-detail-breadcrumb.component";

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterModule, ProjectDetailHeaderComponent, ProjectDetailGalleryComponent, ProjectDetailDescriptionComponent, ProjectDetailTechStackComponent, ProjectDetailBreadcrumbComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  project = signal<Project | undefined>(undefined);
  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo(0, 0);
    
    // Use RxJS operators for cleaner handling of async operations
    this.route.params.pipe(
      switchMap(params => {
        const projectId = params['id'];
        if (!projectId) {
          this.error.set(true);
          this.loading.set(false);
          return [];
        }
        
        this.loading.set(true);
        return this.dataService.getProjectById(projectId);
      })
    ).subscribe({
      next: (project) => {
        if (project && Object.keys(project).length > 0) {
          this.project.set(project);
          this.error.set(false);
        } else {
          this.error.set(true);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { Project } from '../interfaces/project.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project = signal<Project | undefined>(undefined);
  loading = signal<boolean>(true);
  error = signal<boolean>(false);
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

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

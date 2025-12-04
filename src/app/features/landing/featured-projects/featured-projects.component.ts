import { Component, OnInit, signal, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Project } from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.css'
})
export class FeaturedProjectsComponent implements OnInit {
  private dataService = inject(DataService);

  featuredProjects = signal<Project[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.loading.set(true);
    
    this.dataService.getFilteredProjects({ featured: true }).subscribe({
      next: (projects) => {
        this.featuredProjects.set(projects);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading featured projects:', err);
        this.loading.set(false);
      }
    });
  }
}

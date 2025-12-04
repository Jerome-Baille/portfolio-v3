import { Component, OnInit, signal, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Project } from '../../shared/interfaces/project.interface';
import { forkJoin } from 'rxjs';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css'
})
export class ProjectsListComponent implements OnInit {
  private dataService = inject(DataService);

  projects = signal<Project[]>([]);
  categories = signal<string[]>([]);
  selectedCategory = signal<string | null>(null);
  loading = signal<boolean>(true);
  
  ngOnInit() {
    window.scrollTo(0, 0);
    
    // Always fetch fresh data when navigating to projects list
    const forceRefresh = true;
    
    // Load initial data in parallel
    const projectsData$ = this.dataService.getProjectsSortedByDate(forceRefresh);
    const categories$ = this.dataService.getAllTags(forceRefresh);
    
    forkJoin([projectsData$, categories$]).subscribe({
      next: ([projects, categories]) => {
        this.projects.set(projects);
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading projects data:', err);
        this.loading.set(false);
      }
    });
  }

  filterByCategory(category: string | null) {
    this.loading.set(true);
    this.selectedCategory.set(category);
    
    (category ? 
      this.dataService.getFilteredProjects({ tags: category }) : 
      this.dataService.getProjectsSortedByDate()
    ).subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error filtering projects:', err);
        this.loading.set(false);
      }
    });
  }
}

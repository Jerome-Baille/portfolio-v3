import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { Project } from '../interfaces/project.interface';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.css'
})
export class FeaturedProjectsComponent implements OnInit {
  featuredProjects = signal<Project[]>([]);
  loading = signal<boolean>(true);

  constructor(private dataService: DataService) {}

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

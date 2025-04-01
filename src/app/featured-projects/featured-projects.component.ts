import { Component, OnInit } from '@angular/core';
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
  featuredProjects: Project[] = [];
  loading = true;

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    try {
      this.loading = true;
      this.featuredProjects = await this.dataService.getFilteredProjects({ featured: true });
    } catch (err) {
      console.error('Error loading featured projects:', err);
    } finally {
      this.loading = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { Project } from '../interfaces/project.interface';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css'
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  loading = true;

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    window.scrollTo(0, 0);
    
    try {
      // Get all projects sorted by date
      this.projects = await this.dataService.getProjectsSortedByDate();
      
      // Get unique tags for filtering
      this.categories = await this.dataService.getAllTags();
    } catch (err) {
      console.error('Error loading projects data:', err);
    } finally {
      this.loading = false;
    }
  }

  async filterByCategory(category: string | null) {
    this.loading = true;
    this.selectedCategory = category;
    
    try {
      if (category) {
        this.projects = await this.dataService.getFilteredProjects({ tags: category });
      } else {
        this.projects = await this.dataService.getProjectsSortedByDate();
      }
    } catch (err) {
      console.error('Error filtering projects:', err);
    } finally {
      this.loading = false;
    }
  }
}

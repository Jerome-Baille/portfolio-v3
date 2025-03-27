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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    
    // Get all projects sorted by date
    this.dataService.getProjectsSortedByDate().subscribe(projects => {
      this.projects = projects;
    });

    // Get unique tags for filtering
    this.dataService.getAllTags().subscribe(tags => {
      this.categories = tags;
    });
  }

  filterByCategory(category: string | null) {
    this.selectedCategory = category;
    if (category) {
      this.dataService.getFilteredProjects({ tags: category }).subscribe(projects => {
        this.projects = projects;
      });
    } else {
      this.dataService.getProjectsSortedByDate().subscribe(projects => {
        this.projects = projects;
      });
    }
  }
}

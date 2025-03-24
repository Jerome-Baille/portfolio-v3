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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.projects$.subscribe(projects => {
      this.featuredProjects = projects.filter(project => project.featured);
    });
  }
}

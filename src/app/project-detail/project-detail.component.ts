import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { Project } from '../interfaces/project.interface';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;
  loading = true;
  error = false;
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo(0, 0);
    
    this.route.params.subscribe(async params => {
      const projectId = params['id'];
      if (projectId) {
        try {
          this.loading = true;
          const project = await this.dataService.getProjectById(projectId);
          if (project) {
            this.project = project;
          } else {
            this.error = true;
          }
        } catch (err) {
          console.error('Error loading project:', err);
          this.error = true;
        } finally {
          this.loading = false;
        }
      }
    });
  }

  navigateBack(): void {
    this.router.navigate(['/projects-highlight']);
  }
}

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
    
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      if (projectId) {
        this.dataService.getProjectById(projectId).subscribe({
          next: (project) => {
            if (project) {
              this.project = project;
              this.loading = false;
            } else {
              this.error = true;
              this.loading = false;
            }
          },
          error: () => {
            this.error = true;
            this.loading = false;
          }
        });
      }
    });
  }

  navigateBack(): void {
    this.router.navigate(['/projects-highlight']);
  }
}

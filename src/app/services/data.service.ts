import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { environment } from '../../environments/environment';

// Interface for the Asset model from the backend
interface Asset {
  id: number;
  projectId: string;
  type: string;
  format: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for the ProjectResponse from the backend
interface ProjectResponse extends Omit<Project, 'featured' | 'logo' | 'screenshot' | 'mockups'> {
  featured: number; // 0 or 1 in the backend
  Assets: Asset[];
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly projectsSubject = new BehaviorSubject<Project[]>([]);
  
  // Expose the observables
  readonly projects$ = this.projectsSubject.asObservable();
  
  // Track if data is loaded
  private projectsLoaded = false;

  constructor(private http: HttpClient) {}  // Process project data to match frontend model
  private processProjectData(project: ProjectResponse): Project {
    // Convert backend's 0/1 featured to boolean
    const featured = project.featured === 1 ? true : false;
    
    // Transform Assets to expected frontend format
    const logo = project.Assets?.find((asset: Asset) => asset.type === 'logo')?.url || '';
    const screenshot = project.Assets?.find((asset: Asset) => asset.type === 'screenshot')?.url || '';
    
    // Get all mockups sorted by their ID
    const mockups = project.Assets
      ?.filter((asset: Asset) => asset.type === 'mockup')
      .sort((a: Asset, b: Asset) => a.id - b.id)
      .map((asset: Asset) => asset.url) || [];

    // Return the transformed project
    return {
      ...project,
      featured,
      logo,
      screenshot,
      mockups,
      // Make sure github is properly structured even if it's empty/null
      github: project.github || { frontend: '', backend: '', extension: '' }
    };
  }  // To store the ongoing request for concurrent calls
  private currentRequest: Observable<Project[]> | null = null;

  // Load projects from the backend
  loadProjects(forceRefresh: boolean = false): Observable<Project[]> {
    // If we have already loaded projects and aren't forcing a refresh, return cached data
    if (this.projectsLoaded && !forceRefresh) {
      return this.projects$;
    }

    // If there's already a request in progress, return that instead of making a new one
    if (this.currentRequest) {
      return this.currentRequest;
    }

    // Create a new request and store it
    this.currentRequest = this.http.get<any[]>(environment.projectURL).pipe(
      map(projects => projects.map(project => this.processProjectData(project))),
      tap(processedProjects => {
        this.projectsSubject.next(processedProjects);
        this.projectsLoaded = true;
        // Clear the current request after completion
        this.currentRequest = null;
      }),
      shareReplay(1),
      catchError(error => {
        console.error('Error fetching projects:', error);
        // Clear the current request on error
        this.currentRequest = null;
        return of([]);
      })
    );

    return this.currentRequest;
  }

  // Method to get a project by ID
  getProjectById(id: string): Observable<Project> {
    // Check if we already have the project locally
    const projects = this.projectsSubject.getValue();
    const cachedProject = projects.find(p => p.id === id);
    
    if (cachedProject) {
      return of(cachedProject);
    }
    
    // If not in cache, fetch from backend
    return this.http.get<any>(`${environment.projectURL}/${id}`).pipe(
      map(project => this.processProjectData(project)),
      catchError(error => {
        console.error(`Error fetching project with ID ${id}:`, error);
        return of({} as Project);
      })
    );
  }
  // Method to get filtered projects
  getFilteredProjects(filters: { [key: string]: any }, forceRefresh: boolean = false): Observable<Project[]> {
    // First ensure projects are loaded
    return this.loadProjects(forceRefresh).pipe(
      map(projects => {
        let filteredProjects = [...projects];

        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            filteredProjects = filteredProjects.filter(project => {
              // Check if the key exists in the project
              if (!(key in project)) {
                return true; // Skip filtering if the key doesn't exist
              }

              const projectValue = project[key as keyof Project];

              // Handle array values (like tags)
              if (Array.isArray(projectValue)) {
                return projectValue.includes(value);
              }

              // Handle non-array values
              return projectValue === value;
            });
          }
        });

        return filteredProjects;
      })
    );
  }
  // Method to get unique tags
  getAllTags(forceRefresh: boolean = false): Observable<string[]> {
    return this.loadProjects(forceRefresh).pipe(
      map(projects => {
        const tags = new Set<string>();
        projects.forEach(project => {
          project.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
      })
    );
  }  // Method to get projects sorted by date
  getProjectsSortedByDate(forceRefresh: boolean = false): Observable<Project[]> {
    return this.loadProjects(forceRefresh).pipe(
      map(projects => [...projects].sort((a, b) => b.date - a.date))
    );
  }
}

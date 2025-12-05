import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import { Project, ImageFormats } from '../../shared/interfaces/project.interface';
import { environment } from '../../../environments/environment';


// Interface for the new Asset model from the backend (with formats JSON)
interface Asset {
  id: number;
  projectId: string;
  type: string;
  name: string;
  order: number;
  formats: {
    png?: string;
    avif?: string;
    webp?: string;
  };
  alt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Interface for the standardized API response
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
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
  private http = inject(HttpClient);

  private readonly projectsSubject = new BehaviorSubject<Project[]>([]);
  
  // Expose the observables
  readonly projects$ = this.projectsSubject.asObservable();
  
  // Track if data is loaded
  private projectsLoaded = false;

  // Base URL for images (served from backend)
  private readonly imageBaseUrl = environment.portfolioURL.replace('/api', '');

  // Process project data to match frontend model
  private processProjectData(project: ProjectResponse): Project {
    // Convert backend's 0/1 featured to boolean
    const featured = project.featured === 1;
    
    // Helper function to prepend the backend URL to image paths
    const prependBaseUrl = (path: string | undefined): string => {
      if (!path) return '';
      // If it's already an absolute URL, return as is
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
      }
      return `${this.imageBaseUrl}${path}`;
    };
    
    // Helper function to create an ImageFormats object from a single asset (new format)
    const assetToImageFormats = (asset: Asset | undefined): ImageFormats => {
      if (!asset) {
        return { png: '', avif: '', webp: '' };
      }
      return {
        png: prependBaseUrl(asset.formats.png),
        avif: prependBaseUrl(asset.formats.avif),
        webp: prependBaseUrl(asset.formats.webp),
      };
    };
    
    // Get assets by type (new format: one asset per image with all formats)
    const logoAsset = project.Assets?.find((asset: Asset) => asset.type === 'logo');
    const screenshotAsset = project.Assets?.find((asset: Asset) => asset.type === 'screenshot');
    
    // Get mockups sorted by order
    const mockupAssets = project.Assets
      ?.filter((asset: Asset) => asset.type === 'mockup')
      .sort((a, b) => a.order - b.order) || [];
    
    // Convert mockup assets to ImageFormats array
    const mockups = mockupAssets.map(asset => assetToImageFormats(asset));

    // Return the transformed project
    return {
      ...project,
      featured,
      logo: assetToImageFormats(logoAsset),
      screenshot: assetToImageFormats(screenshotAsset),
      mockups,
      // Make sure github is properly structured even if it's empty/null
      github: project.github || { frontend: '', backend: '', extension: '' }
    };
  }

  // To store the ongoing request for concurrent calls
  private currentRequest: Observable<Project[]> | null = null;

  // Load projects from the backend
  loadProjects(forceRefresh = false): Observable<Project[]> {
    // If we have already loaded projects and aren't forcing a refresh, return cached data
    if (this.projectsLoaded && !forceRefresh) {
      return this.projects$;
    }

    // If there's already a request in progress, return that instead of making a new one
    if (this.currentRequest) {
      return this.currentRequest;
    }

    // Create a new request and store it
    // Note: Using limit=100 to get all projects in one request (adjust if you have more)
    this.currentRequest = this.http.get<ApiResponse<ProjectResponse[]>>(`${environment.projectURL}?limit=100`).pipe(
      map(response => {
        // Handle the new standardized API response format
        const projects = response.data || [];
        return projects.map(project => this.processProjectData(project));
      }),
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
    return this.http.get<ApiResponse<ProjectResponse>>(`${environment.projectURL}/${id}`).pipe(
      map(response => this.processProjectData(response.data)),
      catchError(error => {
        console.error(`Error fetching project with ID ${id}:`, error);
        return of({} as Project);
      })
    );
  }
  // Method to get filtered projects
  getFilteredProjects(filters: Record<string, Project[keyof Project]>, forceRefresh = false): Observable<Project[]> {
    // First ensure projects are loaded
    return this.loadProjects(forceRefresh).pipe(
      map(projects => {
        let filteredProjects = [...projects];

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            filteredProjects = filteredProjects.filter(project => {
              // Check if the key exists in the project
              if (!(key in project)) {
                return true; // Skip filtering if the key doesn't exist
              }

              const projectValue = project[key as keyof Project];

              // Handle array values (like tags)
              if (Array.isArray(projectValue) && typeof value === 'string') {
                return (projectValue as string[]).includes(value);
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
  getAllTags(forceRefresh = false): Observable<string[]> {
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
  getProjectsSortedByDate(forceRefresh = false): Observable<Project[]> {
    return this.loadProjects(forceRefresh).pipe(
      map(projects => [...projects].sort((a, b) => b.date - a.date))
    );
  }
}

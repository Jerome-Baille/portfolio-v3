import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface About {
  id: string;
  bio: string[];
  skills: {
    frontend: string[];
    backend: string[];
    others: string[];
  };
  linkedin?: string;
  github?: string;
  resume?: string;
  portrait?: string;
}

@Injectable({ providedIn: 'root' })
export class AboutService {
  private http = inject(HttpClient);

  // Fetch the about entry. Backend supports GET /about or /about/:id
  getAbout(id = 'main', language?: string): Observable<ApiResponse<About>> {
    const url = `${environment.aboutURL}/${id}`;
    const options: { params?: Record<string, string>; observe: 'body' } = { observe: 'body' };
    if (language) options.params = { language };
    return this.http.get<ApiResponse<About>>(url, options);
  }
}

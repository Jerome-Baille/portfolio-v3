import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  private http = inject(HttpClient);

  getCertifications(limit = 100, visible = true): Observable<{ success: boolean; message: string; data: Certification[] }> {
    const url = `${environment.portfolioURL}/certifications?limit=${limit}&visible=${visible}`;
    return this.http.get<{ success: boolean; message: string; data: Certification[] }>(url);
  }
}

export interface Certification {
  id: number;
  name: string;
  issuer?: string;
  issueDate?: string;
  order?: number;
  formats: { png?: string; avif?: string; webp?: string };
  alt?: string | null;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

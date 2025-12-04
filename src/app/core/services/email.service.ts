import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private http = inject(HttpClient);

  private emailUrl = environment.emailURL;
  /**
   * Sends an email with the contact form data
   * @param emailData Object containing name, email, subject and message
   * @returns Observable with the server response as text
   */
  sendEmail(emailData: EmailData): Observable<string> {
    return this.http.post(this.emailUrl, emailData, { responseType: 'text' });
  }
}

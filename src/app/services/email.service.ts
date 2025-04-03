import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private emailUrl = environment.emailURL;

  constructor(private http: HttpClient) { }

  /**
   * Sends an email with the contact form data
   * @param emailData Object containing name, email, subject and message
   * @returns Observable with the server response
   */
  sendEmail(emailData: EmailData): Observable<any> {
    return this.http.post(this.emailUrl, emailData);
  }
}

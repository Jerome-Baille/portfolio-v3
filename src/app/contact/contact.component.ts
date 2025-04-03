import { Component, signal, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../services/email.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnDestroy {
  contactForm: FormGroup;
  isSubmitted = signal(false);
  submitSuccess = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  
  // Timeouts for auto-clearing messages
  private successTimeout: number | null = null;
  private errorTimeout: number | null = null;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.isSubmitted.set(true);
    this.clearAllMessages();
    
    if (this.contactForm.valid) {
      this.isLoading.set(true);
      
      this.emailService.sendEmail(this.contactForm.value)
        .pipe(
          finalize(() => this.isLoading.set(false))
        )
        .subscribe({
          next: () => {
            this.submitSuccess.set(true);
            
            // Auto-clear success message after 5 seconds
            this.successTimeout = window.setTimeout(() => {
              this.submitSuccess.set(false);
              this.successTimeout = null;
            }, 5000);
            
            // Reset form after successful submission
            this.contactForm.reset();
            this.isSubmitted.set(false);
          },
          error: (error) => {
            console.error('Error sending email:', error);
            this.errorMessage.set('Failed to send email. Please try again later.');
            
            // Auto-clear error message after 5 seconds
            this.errorTimeout = window.setTimeout(() => {
              this.errorMessage.set(null);
              this.errorTimeout = null;
            }, 5000);
          }
        });
    }
  }

  /**
   * Close success message manually
   */
  closeSuccessMessage(): void {
    this.submitSuccess.set(false);
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
      this.successTimeout = null;
    }
  }

  /**
   * Close error message manually
   */
  closeErrorMessage(): void {
    this.errorMessage.set(null);
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
      this.errorTimeout = null;
    }
  }

  /**
   * Clear all messages and their timeouts
   */
  private clearAllMessages(): void {
    this.closeSuccessMessage();
    this.closeErrorMessage();
  }

  /**
   * Clean up any timeouts when the component is destroyed
   */
  ngOnDestroy(): void {
    this.clearAllMessages();
  }
}

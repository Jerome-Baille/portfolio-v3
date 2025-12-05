import { Component, signal, inject, DestroyRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmailService } from '../../../core/services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private emailService = inject(EmailService);
  private destroyRef = inject(DestroyRef);

  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitted = signal(false);
  submitSuccess = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted.set(true);
    this.closeSuccessMessage();
    this.closeErrorMessage();

    if (this.contactForm.invalid) return;

    this.isLoading.set(true);

    this.emailService.sendEmail(this.contactForm.getRawValue())
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.submitSuccess.set(true);
          this.contactForm.reset();
          this.isSubmitted.set(false);
          this.autoClear(() => this.submitSuccess.set(false));
        },
        error: (error) => {
          console.error('Error sending email:', error);
          this.errorMessage.set('Failed to send email. Please try again later.');
          this.autoClear(() => this.errorMessage.set(null));
        }
      });
  }

  closeSuccessMessage(): void {
    this.submitSuccess.set(false);
  }

  closeErrorMessage(): void {
    this.errorMessage.set(null);
  }

  showError(field: 'name' | 'email' | 'subject' | 'message'): boolean {
    return this.isSubmitted() && this.formControls[field].invalid;
  }

  getErrorMessage(field: 'name' | 'email' | 'subject' | 'message'): string {
    const errors = this.formControls[field].errors;
    if (errors?.['required']) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    if (errors?.['minlength']) return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors?.['email']) return 'Please enter a valid email address';
    return '';
  }

  private autoClear(callback: () => void): void {
    timer(5000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(callback);
  }
}

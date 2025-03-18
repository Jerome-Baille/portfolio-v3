import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitted = signal(false);
  submitSuccess = signal(false);

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.isSubmitted.set(true);
    
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.submitSuccess.set(true);
      // Reset form after successful submission
      setTimeout(() => {
        this.contactForm.reset();
        this.isSubmitted.set(false);
        this.submitSuccess.set(false);
      }, 3000);
    }
  }
}

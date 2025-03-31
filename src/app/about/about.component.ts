import { Component } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';

interface Certificate {
  name: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  certificates: Certificate[] = [
    { name: 'Google AI Essentials', image: 'google_ai_essentials.png' },
    { name: 'Google Cybersecurity', image: 'google_cybersecurity.png' },
    { name: 'Google Project Management', image: 'google_project_management.png' },
    { name: 'Meta Full Stack Developer', image: 'meta_fullstack.png' }
  ];

  // Image sizes using only responsive values (vw) instead of pixel values
  imageSizes = '(max-width: 768px) 25vw, 15vw';
}

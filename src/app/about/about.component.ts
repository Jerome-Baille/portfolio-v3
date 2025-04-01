import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ViewportAnimationDirective } from '../shared/directives/viewport-animation.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage, ViewportAnimationDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  certificates = [
    { name: 'Google IT Support', image: 'google_it_support.png' },
    { name: 'Google Cybersecurity', image: 'google_cybersecurity.png' },
    { name: 'Google Project Management', image: 'google_project_management.png' },
    { name: 'Google Analytics', image: 'google_analyst.png' },
    { name: 'Google AI Essentials', image: 'google_ai_essentials.png' },
    { name: 'Meta Frontend', image: 'meta_frontend.png' },
    { name: 'Meta Backend', image: 'meta_backend.png' },
    { name: 'Meta Full-Stack', image: 'meta_fullstack.png' },
  ];
  imageSizes = '(max-width: 768px) 25vw, 12vw';
}

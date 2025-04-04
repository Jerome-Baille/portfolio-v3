import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage, ImageLoader, ImageLoaderConfig } from '@angular/common';
import { ViewportAnimationDirective } from '../shared/directives/viewport-animation.directive';

interface Certificate {
  name: string;
  image: string;
}

// Custom image loader that generates URLs for different sizes
export const customImageLoader: ImageLoader = (config: ImageLoaderConfig): string => {
  const width = config.width || 224; // Default to 224 if width is undefined
  const basePath = config.src.startsWith('/') ? config.src.slice(1) : config.src;
  return basePath;
};

@Component({
  selector: 'app-about-carousel',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ViewportAnimationDirective],
  templateUrl: './about-carousel.component.html',
  styleUrl: './about-carousel.component.css'
})
export class AboutCarouselComponent {
  certificates: Certificate[] = [
    { name: 'Google AI Essentials', image: 'certificates/google_ai_essentials.png' },
    { name: 'Google Data Analytics', image: 'certificates/google_analyst.png' },
    { name: 'Google Cybersecurity', image: 'certificates/google_cybersecurity.png' },
    { name: 'Google IT Support', image: 'certificates/google_it_support.png' },
    { name: 'Google Project Management', image: 'certificates/google_project_management.png' },
    { name: 'Meta Backend Developer', image: 'certificates/meta_backend.png' },
    { name: 'Meta Frontend Developer', image: 'certificates/meta_frontend.png' },
    { name: 'Meta Full Stack Developer', image: 'certificates/meta_fullstack.png' }
  ];

  // Image sizes using responsive values
  imageSizes = '(max-width: 768px) 15vw, 20vw';
}

import { Component } from '@angular/core';

import { NgOptimizedImage, ImageLoader, ImageLoaderConfig } from '@angular/common';
import { ViewportAnimationDirective } from '../../../shared/directives';

interface Certificate {
  name: string;
  image: string;
}

// Custom image loader that generates URLs for different sizes
export const customImageLoader: ImageLoader = (config: ImageLoaderConfig): string => {
  const basePath = config.src.startsWith('/') ? config.src.slice(1) : config.src;
  return basePath;
};

@Component({
  selector: 'app-about-carousel',
  standalone: true,
  imports: [NgOptimizedImage, ViewportAnimationDirective],
  templateUrl: './about-carousel.component.html',
  styleUrl: './about-carousel.component.css'
})
export class AboutCarouselComponent {
  certificates: Certificate[] = [
    { name: 'Google AI Essentials', image: 'certificates/google_ai_essentials.webp' },
    { name: 'Google Data Analytics', image: 'certificates/google_analyst.webp' },
    { name: 'Google Cybersecurity', image: 'certificates/google_cybersecurity.webp' },
    { name: 'Google IT Support', image: 'certificates/google_it_support.webp' },
    { name: 'Google Project Management', image: 'certificates/google_project_management.webp' },
    { name: 'Meta Backend Developer', image: 'certificates/meta_backend.webp' },
    { name: 'Meta Frontend Developer', image: 'certificates/meta_frontend.webp' },
    { name: 'Meta Full Stack Developer', image: 'certificates/meta_fullstack.webp' }
  ];

  // Image sizes using responsive values
  imageSizes = '(max-width: 768px) 15vw, 20vw';
}

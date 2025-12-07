import { Component, OnInit, inject } from '@angular/core';

import { NgOptimizedImage, ImageLoader, ImageLoaderConfig } from '@angular/common';
import { ViewportAnimationDirective } from '../../../shared/directives';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CertificationService, Certification } from '../../../core/services/certification.service';
import { environment } from '../../../../environments/environment';

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
  imports: [NgOptimizedImage, ViewportAnimationDirective, TranslatePipe],
  templateUrl: './about-carousel.component.html',
  styleUrl: './about-carousel.component.css'
})
export class AboutCarouselComponent implements OnInit {
  certificates: Certificate[] = [];

  private svc = inject(CertificationService);
  private translate = inject(TranslateService);
  private readonly backendBaseUrl = environment.portfolioURL.replace('/api', '');

  // Image sizes using responsive values
  imageSizes = '(max-width: 768px) 15vw, 20vw';

  ngOnInit(): void {
    this.svc.getCertifications(100, true).subscribe({
      next: resp => {
        this.certificates = (resp.data || []).map((c: Certification) => {
          const imagePath = c.formats.png || c.formats.webp || c.formats.avif || '';
          const image = imagePath.startsWith('http') ? imagePath : `${this.backendBaseUrl}${imagePath}`;
          return { name: c.name, image };
        });
      },
      error: err => {
        console.error('Error loading certifications', err);
      }
    });
  }
}

import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ViewportAnimationDirective } from '../../../shared/directives';
import { AboutService, About } from '../../../core/services/about.service';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ViewportAnimationDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  // Certificate section has been moved to about-carousel component
  about = signal<About | undefined>(undefined);
  loading = signal<boolean>(true);

  // Backend base URL for static assets
  private readonly backendBaseUrl = environment.portfolioURL.replace('/api', '');

  // Computed properties for fallback URLs
  readonly portraitUrl = computed(() => 
    this.about()?.portrait || `${this.backendBaseUrl}/assets/portrait.webp`
  );

  readonly resumeUrl = computed(() => 
    this.about()?.resume || `${this.backendBaseUrl}/pdf/Jerome BAILLE - Frontend Engineer - MEAN.pdf`
  );

  private svc = inject(AboutService);

  ngOnInit(): void {
    this.loading.set(true);
    this.svc.getAbout('main').subscribe({
      next: (resp) => {
        const about = resp.data;
        if (about) {
          const base = environment.portfolioURL.replace('/api', '');
          // Prepend backend URL to portrait if it's a relative path
          if (about.portrait && !about.portrait.startsWith('http://') && !about.portrait.startsWith('https://')) {
            about.portrait = `${base}${about.portrait}`;
          }
          // Prepend backend URL to resume if it's a relative path
          if (about.resume && !about.resume.startsWith('http://') && !about.resume.startsWith('https://')) {
            about.resume = `${base}${about.resume}`;
          }
        }
        this.about.set(about);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading about:', err);
        this.loading.set(false);
      }
    });
  }
}

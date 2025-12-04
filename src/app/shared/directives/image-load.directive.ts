import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Directive({
  selector: 'img[appImageLoad]',
  standalone: true
})
export class ImageLoadDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private loadingService = inject(LoadingService);

  private isLoaded = false;

  ngAfterViewInit(): void {
    // Check if image is already cached and loaded
    if (this.el.nativeElement.complete) {
      this.onLoad();
    }
  }

  @HostListener('load')
  onLoad(): void {
    if (!this.isLoaded) {
      this.isLoaded = true;
      this.loadingService.imageLoaded();
    }
  }

  @HostListener('error')
  onError(): void {
    // Count error as loaded to not block indefinitely
    if (!this.isLoaded) {
      this.isLoaded = true;
      this.loadingService.imageLoaded();
      console.error('Image failed to load:', this.el.nativeElement.src);
    }
  }

  ngOnDestroy(): void {
    // Ensure we don't have any memory leaks
    this.isLoaded = true;
  }
}
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { LoadingService } from "./services/loading.service";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'portfolio-v3';
  private imageEventListeners: { img: HTMLImageElement, load: () => void, error: () => void }[] = [];
  private onDOMChangedObserver: MutationObserver | null = null;
  
  constructor(
    private loadingService: LoadingService,
    private router: Router
  ) {
    // Track route changes to reset image counting
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Initial show of loading spinner while we count the images
      this.loadingService.showLoading();
      
      // Let the DOM update with new route content
      setTimeout(() => this.countAndTrackImages(), 100);
    });
  }
  
  ngAfterViewInit(): void {
    // Initial count of images
    this.countAndTrackImages();
    
    // Setup observer to detect when new images are added to the DOM
    this.setupMutationObserver();
  }
  
  ngOnDestroy(): void {
    // Clean up all event listeners
    this.cleanupImageEventListeners();
    
    // Disconnect the mutation observer
    if (this.onDOMChangedObserver) {
      this.onDOMChangedObserver.disconnect();
      this.onDOMChangedObserver = null;
    }
  }
  
  /**
   * Set up a mutation observer to detect when new images are added to the DOM
   */
  private setupMutationObserver(): void {
    this.onDOMChangedObserver = new MutationObserver((mutations) => {
      let shouldRecount = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          const addedImages = Array.from(mutation.addedNodes)
            .filter(node => node.nodeName === 'IMG' || (node instanceof Element && node.querySelectorAll('img').length > 0));
            
          if (addedImages.length > 0) {
            shouldRecount = true;
          }
        }
      });
      
      if (shouldRecount) {
        // Recount images when new ones are added
        this.countAndTrackImages();
      }
    });
    
    this.onDOMChangedObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  /**
   * Count all images on the page and register them with the loading service
   */
  private countAndTrackImages(): void {
    // Clean up previous event listeners first
    this.cleanupImageEventListeners();
    
    // Reset tracking
    this.loadingService.resetImageTracking();
    
    // Get all images
    const images = document.querySelectorAll('img');
    
    // If no images, hide loading immediately
    if (images.length === 0) {
      this.loadingService.hideLoading();
      return;
    }
    
    // Register image count with loadingService
    this.loadingService.registerImages(images.length);
    
    // Track loading status for each image
    let loadedCount = 0;
    
    images.forEach(img => {
      // For already loaded or errored images
      if (img.complete) {
        loadedCount++;
      } else {
        // For images still loading, add event listeners
        const onLoad = () => {
          this.loadingService.imageLoaded();
        };
        
        const onError = () => {
          console.error('Failed to load image:', img.src);
          this.loadingService.imageLoaded(); // Count errors as loaded to avoid spinner getting stuck
        };
        
        // Store references to event listeners so we can remove them later
        this.imageEventListeners.push({ img, load: onLoad, error: onError });
        
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
      }
    });
    
    // Update for already loaded images
    if (loadedCount > 0) {
      for (let i = 0; i < loadedCount; i++) {
        this.loadingService.imageLoaded();
      }
    }
    
    // Safety timeout: hide spinner after 10 seconds regardless
    // to prevent spinner from being stuck indefinitely
    setTimeout(() => {
      this.loadingService.hideLoading();
    }, 10000);
  }
  
  /**
   * Clean up image event listeners to prevent memory leaks
   */
  private cleanupImageEventListeners(): void {
    this.imageEventListeners.forEach(({ img, load, error }) => {
      img.removeEventListener('load', load);
      img.removeEventListener('error', error);
    });
    
    this.imageEventListeners = [];
  }
}

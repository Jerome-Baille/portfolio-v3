import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  
  private totalImages = 0;
  private loadedImages = 0;
  private imagesRegistered = false;

  constructor(private ngZone: NgZone) { }

  /**
   * Show the loading spinner
   */
  showLoading(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.loadingSubject.next(true);
      }, 0);
    });
  }

  /**
   * Hide the loading spinner
   */
  hideLoading(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.loadingSubject.next(false);
      }, 0);
    });
  }

  /**
   * Register the total number of images on the current page to track loading progress
   */
  registerImages(total: number): void {
    this.totalImages = total;
    this.loadedImages = 0;
    this.imagesRegistered = true;
    
    if (total === 0) {
      this.hideLoading(); // No images to load
    } else {
      this.showLoading();
    }
  }

  /**
   * Mark an image as loaded and check if all images are loaded
   */
  imageLoaded(): void {
    if (!this.imagesRegistered) {
      return;
    }
    
    this.loadedImages++;
    
    if (this.loadedImages >= this.totalImages) {
      // All images loaded, hide the spinner after a small delay
      // to ensure smooth transition
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.hideLoading();
        }, 300);
      });
    }
  }

  /**
   * Reset the image loading tracker
   */
  resetImageTracking(): void {
    this.totalImages = 0;
    this.loadedImages = 0;
    this.imagesRegistered = false;
  }

  /**
   * Get the current loading status
   */
  getLoadingStatus(): {total: number, loaded: number, isRegistered: boolean} {
    return {
      total: this.totalImages,
      loaded: this.loadedImages,
      isRegistered: this.imagesRegistered
    };
  }
}

import { Injectable, NgZone, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  /**
   * Signal for the loading state using Angular 19's signals
   * Initially false as we don't want to show the spinner right away
   */
  private isLoading = signal<boolean>(false);
  
  /**
   * Public observable for components that need to subscribe to loading state
   */
  public loading$ = toObservable(this.isLoading);
  
  /**
   * Request counter to manage multiple concurrent requests
   */
  private pendingRequests = 0;

  constructor(private ngZone: NgZone) {}

  /**
   * Show the loading spinner when an API request starts
   */
  startLoading(): void {
    this.ngZone.runOutsideAngular(() => {
      this.pendingRequests++;
      if (this.pendingRequests === 1) {
        // Only update the signal when transitioning from 0 to 1 pending requests
        this.isLoading.set(true);
      }
    });
  }

  /**
   * Hide the loading spinner when an API request completes
   */
  stopLoading(): void {
    this.ngZone.runOutsideAngular(() => {
      this.pendingRequests = Math.max(0, this.pendingRequests - 1);
      if (this.pendingRequests === 0) {
        // Small delay for smoother transition
        setTimeout(() => {
          this.isLoading.set(false);
        }, 200);
      }
    });
  }
  
  /**
   * Force reset the loading state (useful for error scenarios)
   */
  resetLoading(): void {
    this.ngZone.runOutsideAngular(() => {
      this.pendingRequests = 0;
      this.isLoading.set(false);
    });
  }
  
  /**
   * Check if currently loading
   */
  getLoadingState(): boolean {
    return this.isLoading();
  }

  /**
   * Called by non-HTTP consumers (for example image directives) when
   * an individual resource has finished loading. This is a public
   * convenience wrapper around stopLoading so callers don't need to
   * know about request semantics.
   */
  imageLoaded(): void {
    this.stopLoading();
  }
}

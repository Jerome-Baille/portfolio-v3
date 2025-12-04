import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/**
 * HTTP interceptor that shows/hides the loading spinner automatically
 * for all HTTP requests.
 */
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // Skip spinner for certain requests if needed
  // For example, background polling or non-UI impacting requests
  const skipLoading = req.headers.has('x-skip-loading');
  
  if (!skipLoading) {
    // Start showing the loading spinner
    loadingService.startLoading();
  }
  
  // Continue with the request and add finalize to hide spinner when done
  return next(req).pipe(
    finalize(() => {
      // Hide spinner when request completes (success or error)
      if (!skipLoading) {
        loadingService.stopLoading();
      }
    })
  );
};

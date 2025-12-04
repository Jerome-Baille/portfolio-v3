import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IMAGE_LOADER } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { customImageLoader } from './features/landing/about-carousel/about-carousel.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([httpInterceptor])
    ),
    {
      provide: IMAGE_LOADER,
      useValue: customImageLoader
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};

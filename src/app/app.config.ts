import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IMAGE_LOADER } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { customImageLoader } from './about-carousel/about-carousel.component';
import { provideServiceWorker } from '@angular/service-worker';
import { httpInterceptor } from './interceptors/http.interceptor';

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

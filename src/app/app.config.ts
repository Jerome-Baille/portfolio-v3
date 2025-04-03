import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IMAGE_LOADER } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { customImageLoader } from './about-carousel/about-carousel.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: IMAGE_LOADER,
      useValue: customImageLoader
    }
  ]
};

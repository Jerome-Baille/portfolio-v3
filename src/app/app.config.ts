import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IMAGE_LOADER, ImageLoader } from '@angular/common';
import { routes } from './app.routes';
import { customImageLoader } from './about-carousel/about-carousel.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: IMAGE_LOADER,
      useValue: customImageLoader
    }
  ]
};

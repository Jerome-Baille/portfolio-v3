import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('imageLoaded hides spinner after active load', fakeAsync(() => {
    service.startLoading();
    expect(service.getLoadingState()).toBe(true);

    service.imageLoaded();

    // stopLoading uses a 200ms setTimeout for smoother transition
    tick(250);

    expect(service.getLoadingState()).toBe(false);
  }));
});

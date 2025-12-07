import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCarouselComponent } from './about-carousel.component';
import { of } from 'rxjs';
import { CertificationService } from '../../../core/services/certification.service';

describe('AboutCarouselComponent', () => {
  let component: AboutCarouselComponent;
  let fixture: ComponentFixture<AboutCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCarouselComponent],
      providers: [
        { provide: CertificationService, useValue: { getCertifications: () => of({ success: true, message: '', data: [] }) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

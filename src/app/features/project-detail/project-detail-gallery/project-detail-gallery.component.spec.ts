import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailGalleryComponent } from './project-detail-gallery.component';

describe('ProjectDetailGalleryComponent', () => {
  let component: ProjectDetailGalleryComponent;
  let fixture: ComponentFixture<ProjectDetailGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

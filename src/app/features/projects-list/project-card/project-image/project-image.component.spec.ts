import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectImageComponent } from './project-image.component';

describe('ProjectImageComponent', () => {
  let component: ProjectImageComponent;
  let fixture: ComponentFixture<ProjectImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

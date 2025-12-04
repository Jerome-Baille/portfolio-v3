import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailDescriptionComponent } from './project-detail-description.component';

describe('ProjectDetailDescriptionComponent', () => {
  let component: ProjectDetailDescriptionComponent;
  let fixture: ComponentFixture<ProjectDetailDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

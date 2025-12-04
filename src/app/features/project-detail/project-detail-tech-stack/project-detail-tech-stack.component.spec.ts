import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailTechStackComponent } from './project-detail-tech-stack.component';

describe('ProjectDetailTechStackComponent', () => {
  let component: ProjectDetailTechStackComponent;
  let fixture: ComponentFixture<ProjectDetailTechStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailTechStackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailTechStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

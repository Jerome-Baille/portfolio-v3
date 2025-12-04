import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailBreadcrumbComponent } from './project-detail-breadcrumb.component';

describe('ProjectDetailBreadcrumbComponent', () => {
  let component: ProjectDetailBreadcrumbComponent;
  let fixture: ComponentFixture<ProjectDetailBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

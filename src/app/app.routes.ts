import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'projects',
        component: ProjectsListComponent
    },
    {
        path: 'project/:id',
        component: ProjectDetailComponent
    }
];

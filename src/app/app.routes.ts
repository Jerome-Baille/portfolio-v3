import { Routes } from '@angular/router';
import { ProjectDetailComponent } from './features/project-detail/project-detail.component';
import { ProjectsListComponent } from './features/projects-list/projects-list.component';
import { LandingComponent } from './features/landing/landing.component';

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

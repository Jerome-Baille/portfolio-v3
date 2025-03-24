import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'projects-highlight',
        component: FeaturedProjectsComponent
    },
    {
        path: 'projects',
        component: ProjectsListComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'project/:id',
        component: ProjectDetailComponent
    }
];

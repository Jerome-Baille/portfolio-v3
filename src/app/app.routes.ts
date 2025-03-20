import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';

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
        path: 'contact',
        component: ContactComponent
    }
];

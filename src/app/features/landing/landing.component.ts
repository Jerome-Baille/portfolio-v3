import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ViewportAnimationDirective } from '../../shared/directives';
import { AboutComponent } from './about/about.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';
import { ContactComponent } from './contact/contact.component';


@Component({
  selector: 'app-landing',
  imports: [
    HeroComponent, 
    AboutComponent, 
    FeaturedProjectsComponent, 
    ContactComponent,
    ViewportAnimationDirective
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}

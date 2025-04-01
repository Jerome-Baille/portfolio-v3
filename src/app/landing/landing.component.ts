import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { AboutComponent } from "../about/about.component";
import { FeaturedProjectsComponent } from "../featured-projects/featured-projects.component";
import { ContactComponent } from "../contact/contact.component";
import { ViewportAnimationDirective } from "../shared/directives/viewport-animation.directive";

@Component({
  selector: 'app-landing',
  imports: [
    HomeComponent, 
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

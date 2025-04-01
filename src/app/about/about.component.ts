import { Component } from '@angular/core';
import { ViewportAnimationDirective } from '../shared/directives/viewport-animation.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ViewportAnimationDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  // Certificate section has been moved to about-carousel component
}

import { Component } from '@angular/core';
import { AboutCarouselComponent } from "../about-carousel/about-carousel.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutCarouselComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent {

}

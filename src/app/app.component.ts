import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { SpinnerComponent } from "./core/components/spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-v3';

  constructor() {
    // The HTTP interceptor now automatically handles the loading state for API requests
  }
}

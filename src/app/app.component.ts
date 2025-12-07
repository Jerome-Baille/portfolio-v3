import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { SpinnerComponent } from "./core/components/spinner/spinner.component";
import { TranslateService } from '@ngx-translate/core';

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
export class AppComponent implements OnInit {
  title = 'portfolio-v3';
  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const browserLang = this.translate.getBrowserLang();
    const supportedLangs = ['en', 'fr'];
    
    // Use French if browser language is French, otherwise default to English
    const langToUse = browserLang === 'fr' ? 'fr' : 'en';
    
    this.translate.addLangs(supportedLangs);
    this.translate.setDefaultLang('en');
    this.translate.use(langToUse);
  }
}

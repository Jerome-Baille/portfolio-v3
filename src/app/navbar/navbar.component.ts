import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  
  isDesktop$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 768px)'])
    .pipe(
      map(result => result.matches)
    );

  activeSection: string = '';
  isScrolled = false;

  ngOnInit() {
    // Check scroll position on init to set correct navbar state
    this.checkScrollPosition();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkScrollPosition();
  }
  
  checkScrollPosition() {
    this.isScrolled = window.scrollY > 20;

    const sections = ['about', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100; // offset for better activation

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;
        
        if (scrollPosition >= top && scrollPosition < bottom) {
          this.activeSection = section;
          return;
        }
      }
    }

    // If at the top of the page
    if (window.scrollY < 100) {
      this.activeSection = 'top';
    }
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    
    if (this.router.url !== '/') {
      // If we're not on the root path, navigate to root first
      this.router.navigate(['']).then(() => {
        // Wait for the landing component to load
        setTimeout(() => {
          this.performScrollToSection(sectionId);
        }, 100);
      });
    } else {
      // We're already on the root path, just scroll
      this.performScrollToSection(sectionId);
    }
  }
  
  private performScrollToSection(sectionId: string) {
    // Default behavior for other sections
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

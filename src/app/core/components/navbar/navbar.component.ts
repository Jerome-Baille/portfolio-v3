import { Component, HostListener, inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, take, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';

type NavbarSection = 'hero' | 'about' | 'projects' | 'contact' | '';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class NavbarComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  
  isDesktop$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 768px)'])
    .pipe(
      map(result => result.matches)
    );

  activeSection: NavbarSection = 'hero';
  isScrolled = false;
  isLandingPage = true;

  ngOnInit() {
    // Check current route on init
    this.isLandingPage = this.router.url === '/';
    this.cdr.markForCheck();
    
    // Subscribe to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
      this.isLandingPage = event.url === '/';

      // Reset active section when not on landing page
      if (!this.isLandingPage) {
        this.activeSection = '';
      } else {
        // If we're back to the landing page, update active section based on scroll
        this.checkScrollPosition();
      }
    });

    // Check scroll position on init to set correct navbar state
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkScrollPosition();
  }
  
  checkScrollPosition() {
    this.isScrolled = window.scrollY > 20;

    // Only update active section if on landing page
    if (!this.isLandingPage) {
      return;
    }

    const sections = ['about', 'projects', 'contact'] as const;
    // Use a fixed offset of 48px for the header
    const offset = 48;
    const scrollPosition = window.scrollY + offset;

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
      this.activeSection = 'hero';
    }
    this.cdr.markForCheck();
  }

  scrollToSection(sectionId: NavbarSection, event: Event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    // Subscribe to the next NavigationEnd *before* navigating so we don't miss it
    const scrollOnNavigationEnd = () => {
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        take(1)
      ).subscribe(() => {
        // Give the DOM a tick to render the landing sections, then scroll
        setTimeout(() => this.performScrollToSection(sectionId), 0);
      });
    };

    if (this.router.url !== '/') {
      scrollOnNavigationEnd();
      this.router.navigate(['']);
    } else {
      setTimeout(() => this.performScrollToSection(sectionId), 0);
    }
  }
  
  private performScrollToSection(sectionId: NavbarSection) {
    // Use a fixed offset of 48px for the header
    const headerOffset = 48;
    const element = document.getElementById(sectionId);

    if (element) {
      const targetPosition = element.offsetTop - headerOffset;
      window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, HostListener, inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, take, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
// filter operator already imported above
import { TranslateModule } from '@ngx-translate/core';

type NavbarSection = 'top' | 'about' | 'projects' | 'contact' | '';

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
  // viewportScroller intentionally not used; using window.scrollTo for precise offset control
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  
  isDesktop$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 768px)'])
    .pipe(
      map(result => result.matches)
    );

  activeSection: NavbarSection = 'top';
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
    // offset accounts for the fixed header
    const offset = this.getHeaderHeight() + 30;
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
      this.activeSection = 'top';
    }
    this.cdr.markForCheck();
  }

  scrollToSection(sectionId: NavbarSection, event: Event) {
    event.preventDefault();
    const navigateAndScroll = () => {
      // use router navigation to ensure correct route then scroll once navigation completes
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        take(1)
      ).subscribe(() => this.performScrollToSection(sectionId));
    };

    if (this.router.url !== '/') {
      // If we're not on the root path, navigate to root with fragment
      this.router.navigate([''], { fragment: sectionId }).then(() => {
        navigateAndScroll();
      });
    } else {
      // We're already on the root path, just scroll
      this.performScrollToSection(sectionId);
    }
  }
  
  private performScrollToSection(sectionId: NavbarSection) {
    // Compute header height to offset for fixed header
    const headerOffset = this.getHeaderHeight() + 16; // small breathing room
    // Special case for projects: add a little extra offset to avoid over-scroll
    const additionalOffsetForProjects = sectionId === 'projects' ? 48 : 0;
    const element = document.getElementById(sectionId);

    if (element) {
      const targetPosition = element.offsetTop - headerOffset - additionalOffsetForProjects;
      // prevent scrolling past max
      const clampedPosition = Math.max(0, Math.min(targetPosition, document.body.scrollHeight - window.innerHeight));
      window.scrollTo({ top: clampedPosition, behavior: 'smooth' });
    } else if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private getHeaderHeight(): number {
    const header = document.querySelector('header');
    return header ? (header as HTMLElement).offsetHeight : 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

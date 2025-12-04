import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appViewportAnimation]',
  standalone: true
})
export class ViewportAnimationDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() animationClass = 'fade-in';
  @Input() threshold = 0.1;
  @Input() animationDelay = 0; // Delay in milliseconds
  @Input() repeatAnimation = false; // Whether to repeat the animation when scrolling in and out
  
  private observer: IntersectionObserver | null = null;
  private isVisible = false;
  private outAnimationClass = '';

  ngOnInit() {
    // Add initial hidden class
    this.renderer.addClass(this.el.nativeElement, 'invisible');
    this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    
    // Determine the out animation class based on the in animation
    this.setOutAnimationClass();
    
    // Set up the observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // When element enters viewport
          if (entry.isIntersecting && !this.isVisible) {
            this.showElement();
          } 
          // When element exits viewport (and repeat is enabled)
          else if (!entry.isIntersecting && this.isVisible && this.repeatAnimation) {
            this.hideElement();
          }
        });
      },
      { threshold: this.threshold, rootMargin: "-10px" }
    );
    
    this.observer.observe(this.el.nativeElement);
  }

  private showElement(): void {
    this.isVisible = true;
    
    setTimeout(() => {
      // Remove hiding classes
      this.renderer.removeClass(this.el.nativeElement, 'invisible');
      this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
      
      // Remove out animation if applied previously
      if (this.outAnimationClass) {
        this.renderer.removeClass(this.el.nativeElement, this.outAnimationClass);
      }
      
      // Add in animation
      this.renderer.addClass(this.el.nativeElement, this.animationClass);
    }, this.animationDelay);
  }

  private hideElement(): void {
    this.isVisible = false;
    
    // Remove the in animation class
    this.renderer.removeClass(this.el.nativeElement, this.animationClass);
    
    // Add the out animation class
    if (this.outAnimationClass) {
      this.renderer.addClass(this.el.nativeElement, this.outAnimationClass);
    } else {
      // If no specific out animation, just hide it
      this.renderer.addClass(this.el.nativeElement, 'invisible');
      this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    }
  }

  private setOutAnimationClass(): void {
    // Map entrance animations to exit animations
    switch(this.animationClass) {
      case 'fade-in':
        this.outAnimationClass = 'fade-out';
        break;
      case 'slide-in-left':
        this.outAnimationClass = 'slide-out-left';
        break;
      case 'slide-in-right':
        this.outAnimationClass = 'slide-out-right';
        break;
      case 'slide-in-up':
        this.outAnimationClass = 'slide-out-down';
        break;
      case 'zoom-in':
        this.outAnimationClass = 'zoom-out';
        break;
      default:
        this.outAnimationClass = 'fade-out';
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
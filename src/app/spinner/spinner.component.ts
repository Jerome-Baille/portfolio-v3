import { Component, OnDestroy, OnInit, ChangeDetectorRef, NgZone, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit, OnDestroy {
  isLoading = true;
  private loadingSubscription!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private ngZone: NgZone,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    // Run outside Angular zone to prevent excessive change detection
    this.ngZone.runOutsideAngular(() => {
      // Subscribe to the loading status
      this.loadingSubscription = this.loadingService.loading$.subscribe(
        (isLoading) => {
          // Update the isLoading value
          this.isLoading = isLoading;
          
          // Manually trigger change detection in a safe way
          this.ngZone.run(() => {
            // Use setTimeout to ensure changes happen in a separate cycle
            setTimeout(() => {
              this.appRef.tick();
            }, 0);
          });
        }
      );
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}

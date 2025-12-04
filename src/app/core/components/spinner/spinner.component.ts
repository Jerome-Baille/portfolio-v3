import { Component, OnDestroy, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit, OnDestroy {
  private loadingService = inject(LoadingService);
  private cdr = inject(ChangeDetectorRef);

  isLoading = true;
  private loadingSubscription!: Subscription;

  ngOnInit(): void {
    // Subscribe to the loading status. Updating in setTimeout defers
    // the change to the next macrotask which prevents
    // ExpressionChangedAfterItHasBeenCheckedError.
    this.loadingSubscription = this.loadingService.loading$.subscribe(
      (isLoading) => {
        setTimeout(() => {
          this.isLoading = isLoading;
          this.cdr.detectChanges();
        }, 0);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}

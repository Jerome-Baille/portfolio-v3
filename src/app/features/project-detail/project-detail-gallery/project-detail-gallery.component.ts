import {
  Component,
  input,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Project, ImageFormats } from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-project-detail-gallery',
  standalone: true,
  templateUrl: './project-detail-gallery.component.html',
  styleUrl: './project-detail-gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailGalleryComponent {
  /** Project data input using signal-based input */
  readonly project = input.required<Project | undefined>();

  /** 
   * Display order: maps visual positions to original mockup indices.
   * Position 0 = featured/main image, positions 1+ = thumbnails in order
   */
  private readonly displayOrder = signal<number[]>([]);

  /** Computed mockups array for the template */
  readonly mockups = computed(() => this.project()?.mockups ?? []);

  /** Whether mockups exist */
  readonly hasMockups = computed(() => this.mockups().length > 0);

  /** Whether there are additional mockups beyond the main one */
  readonly hasAdditionalMockups = computed(() => this.mockups().length > 1);

  /** The main featured mockup to display */
  readonly featuredMockup = computed(() => {
    const order = this.displayOrder();
    const allMockups = this.mockups();
    if (order.length === 0 || allMockups.length === 0) {
      return allMockups[0] as ImageFormats;
    }
    return allMockups[order[0]] as ImageFormats;
  });

  /** Thumbnail mockups with their original indices for tracking */
  readonly thumbnailMockups = computed(() => {
    const order = this.displayOrder();
    const allMockups = this.mockups();
    
    if (order.length === 0) {
      // Initial state: thumbnails are indices 1, 2, 3, ...
      return allMockups.slice(1).map((mockup, i) => ({ 
        mockup, 
        originalIndex: i + 1 
      }));
    }
    
    // Skip first (featured) and map the rest
    return order.slice(1).map(originalIndex => ({
      mockup: allMockups[originalIndex],
      originalIndex
    }));
  });

  /** Project title for alt text */
  readonly projectTitle = computed(() => this.project()?.title ?? 'Project');

  constructor() {
    // Initialize display order when mockups change
    effect(() => {
      const mockupsLength = this.mockups().length;
      if (mockupsLength > 0 && this.displayOrder().length !== mockupsLength) {
        // Initialize with natural order: [0, 1, 2, 3, ...]
        this.displayOrder.set(Array.from({ length: mockupsLength }, (_, i) => i));
      }
    }, { allowSignalWrites: true });
  }

  /**
   * Swaps the clicked thumbnail with the featured image.
   * The clicked image becomes featured, and the current featured takes its place.
   * @param originalIndex - The original index of the clicked mockup
   */
  swapWithFeatured(originalIndex: number): void {
    const currentOrder = [...this.displayOrder()];
    const featuredOriginalIndex = currentOrder[0];
    
    // Find where the clicked image is in the display order
    const clickedPosition = currentOrder.indexOf(originalIndex);
    
    if (clickedPosition > 0) {
      // Swap: clicked image goes to position 0 (featured)
      // Current featured goes to where clicked image was
      currentOrder[0] = originalIndex;
      currentOrder[clickedPosition] = featuredOriginalIndex;
      
      this.displayOrder.set(currentOrder);
    }
  }

  /**
   * TrackBy function for thumbnail mockups
   */
  trackByIndex(_: number, item: { mockup: ImageFormats; originalIndex: number }): number {
    return item.originalIndex;
  }
}

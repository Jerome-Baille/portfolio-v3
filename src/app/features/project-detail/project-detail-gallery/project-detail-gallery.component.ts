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
   * Tracks which thumbnail position image 0 is currently occupying.
   * null means image 0 is in the main display (default state)
   * A number means image 0 is at that thumbnail position, and that image is featured
   */
  private readonly swappedWithIndex = signal<number | null>(null);

  /** Computed mockups array for the template */
  readonly mockups = computed(() => this.project()?.mockups ?? []);

  /** Whether mockups exist */
  readonly hasMockups = computed(() => this.mockups().length > 0);

  /** Whether there are additional mockups beyond the main one */
  readonly hasAdditionalMockups = computed(() => this.mockups().length > 1);

  /** The main featured mockup to display */
  readonly featuredMockup = computed(() => {
    const allMockups = this.mockups();
    if (allMockups.length === 0) {
      return { png: '', avif: '', webp: '' } as ImageFormats;
    }
    const swapped = this.swappedWithIndex();
    // If swapped, show that image; otherwise show image 0
    return allMockups[swapped ?? 0] as ImageFormats;
  });

  /** Thumbnail mockups - images 1, 2, 3... but with image 0 swapped in if applicable */
  readonly thumbnailMockups = computed(() => {
    const allMockups = this.mockups();
    if (allMockups.length <= 1) return [];
    
    const swapped = this.swappedWithIndex();
    
    // Build thumbnails from indices 1, 2, 3, ...
    return allMockups.slice(1).map((mockup, i) => {
      const originalIndex = i + 1; // Original indices are 1, 2, 3, ...
      
      // If this position was swapped with image 0, show image 0 here instead
      if (swapped === originalIndex) {
        return { mockup: allMockups[0], originalIndex };
      }
      
      return { mockup, originalIndex };
    });
  });

  /** Project title for alt text */
  readonly projectTitle = computed(() => this.project()?.title ?? 'Project');

  constructor() {
    // Reset swapped state when project changes
    effect(() => {
      // Access mockups to create dependency
      this.mockups();
      // Reset to default when project changes
      this.swappedWithIndex.set(null);
    });
  }

  /**
   * Swaps the clicked thumbnail with the main display.
   * - If clicking a new thumbnail: swap image 0 to that position, show clicked image as featured
   * - Image 0 always returns to its original spot before swapping to a new position
   * @param originalIndex - The original index of the thumbnail position clicked
   */
  swapWithMain(originalIndex: number): void {
    const currentSwapped = this.swappedWithIndex();
    
    // If clicking the position where image 0 currently is, reset to default
    if (currentSwapped === originalIndex) {
      this.swappedWithIndex.set(null);
    } else {
      // Swap image 0 to this position (previous swap is automatically undone)
      this.swappedWithIndex.set(originalIndex);
    }
  }

  /**
   * TrackBy function for thumbnail mockups
   */
  trackByIndex(_: number, item: { mockup: ImageFormats; originalIndex: number }): number {
    return item.originalIndex;
  }
}

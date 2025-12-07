import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Github {
  frontend?: string;
  backend?: string;
  extension?: string;
}

@Component({
  selector: 'app-project-links',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './project-links.component.html',
  styleUrl: './project-links.component.css'
})
export class ProjectLinksComponent {

  @Input() github: Github | undefined;
  @Input() website: string | undefined;
  @Input() title = '';

}

import {ChangeDetectionStrategy, Component, effect, input} from '@angular/core';

@Component({
  selector: 'span-expandable',
  standalone: true,
  templateUrl: './span-expandable.component.html',
  styleUrls: ['./span-expandable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpanExpandableComponent {
  readonly collapsedText = input.required<string>();
  readonly expandedText = input.required<string>();
  readonly initialExpanded = input<boolean>(false);

  protected isExpanded = false;

  constructor() {
    effect(() => {
      this.isExpanded = this.initialExpanded();
    });
  }

  protected toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.toggleExpanded();
  }
}

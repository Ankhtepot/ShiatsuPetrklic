import {ChangeDetectionStrategy, Component, effect, input, signal} from '@angular/core';
import {TextPipe} from '../../pipes/text.pipe';
import {T} from '../../shared/constants/text.tokens';

@Component({
  selector: 'span-expandable',
  standalone: true,
  imports: [TextPipe],
  templateUrl: './span-expandable.component.html',
  styleUrls: ['./span-expandable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpanExpandableComponent {
  protected readonly T = T;

  readonly collapsedText = input.required<string>();
  readonly expandedText = input.required<string>();
  readonly initialExpanded = input<boolean>(false);

  protected readonly isExpanded = signal(false);

  constructor() {
    effect(() => {
      this.isExpanded.set(this.initialExpanded());
    });
  }

  protected toggleExpanded(): void {
    this.isExpanded.update((expanded) => !expanded);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.toggleExpanded();
  }
}

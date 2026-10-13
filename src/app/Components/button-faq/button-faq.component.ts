import {ChangeDetectionStrategy, Component, effect, input, signal} from '@angular/core';

let nextId = 0;

/**
 * One FAQ item: the question is a button that never changes, the field around it grows to the
 * height of the answer and the answer then fades in (closing runs in reverse).
 * The answer is always in the DOM, so crawlers read it even when collapsed.
 */
@Component({
  selector: 'app-button-faq',
  standalone: true,
  templateUrl: './button-faq.component.html',
  styleUrls: ['./button-faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonFaqComponent {
  readonly question = input.required<string>();
  /** May contain HTML (links, <br>), same as other translated texts */
  readonly answer = input.required<string>();
  readonly initialExpanded = input<boolean>(false);

  protected readonly isExpanded = signal(false);
  protected readonly answerId = `faq-answer-${nextId++}`;

  constructor() {
    effect(() => {
      this.isExpanded.set(this.initialExpanded());
    });
  }

  protected toggleExpanded(): void {
    this.isExpanded.update((expanded) => !expanded);
  }
}

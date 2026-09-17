import {CommonModule} from '@angular/common';
import {Component, Input, inject} from '@angular/core';
import {MarkdownComponent} from 'ngx-markdown';
import {ELanguage, LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-soft-topic-card',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './soft-topic-card.component.html',
  styleUrls: ['./soft-topic-card.component.scss']
})
export class SoftTopicCardComponent {
  private languageService = inject(LanguageService);

  @Input({required: true}) anchorId!: string;
  @Input({required: true}) eyebrow!: string;
  @Input({required: true}) title!: string;
  @Input() icon = 'bi-stars';
  @Input({required: true}) markdownCsPath!: string;
  @Input() markdownEnPath?: string;

  getMarkdownPath(): string {
    if (this.languageService.current === ELanguage.En && this.markdownEnPath) {
      return this.markdownEnPath;
    }

    return this.markdownCsPath;
  }
}

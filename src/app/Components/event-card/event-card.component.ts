import {Component, inject, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DEFAULT_EVENT_DATA, EventData} from '../../shared/models/event-data';
import {ELanguage, LanguageService} from '../../services/language.service';
import {cutAtLastWholeWord} from '../../shared/utilities/string-extensions';
import {ButtonReadMoreComponent} from '../button-read-more/button-read-more.component';
import {T} from '../../shared/constants/text.tokens';
import {TextPipe} from '../../pipes/text.pipe';
import {of} from 'rxjs';
import {ContentItem, ContentItemHyperlink, ContentItemText, EContentItem} from '../../shared/models/content-item';
import {MarkdownComponent} from 'ngx-markdown';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, ButtonReadMoreComponent, TextPipe, MarkdownComponent],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  event: InputSignal<EventData> = input(DEFAULT_EVENT_DATA);

  isExpanded = signal(false);
  description: WritableSignal<string> = signal('');
  title: WritableSignal<string> = signal('');
  postEventText: WritableSignal<string> = signal('');

  languageService = inject(LanguageService);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (!this.event()) {
      console.error('Event data is not provided to the EventCardComponent');
      return;
    }

    this.resolveTexts();
  }

  resolveTexts() {
    this.description.set(this.resolveText(this.event().descriptionCs, this.event().descriptionEn));
    this.title.set(this.resolveText(this.event().titleCs, this.event().titleEn, 25));
    this.postEventText.set(this.resolveText(this.event().postEventTextCs, this.event().postEventTextEn));
  }

  openModal() {
    this.router.navigate(['details', this.event().id], { relativeTo: this.route});
  }

  setExpanded(isExpanded: boolean) {
    this.isExpanded.set(isExpanded);
  }

  public resolveText(textCs?: string, textEn?: string, cutoffText?: number): string {
    if (!textCs && !textEn) {
      return '';
    }

    let usedText: string;
    if (this.languageService.current === ELanguage.Cs
      || (this.languageService.current === ELanguage.En && !textEn)) {
      usedText = textCs || '';
    } else {
      usedText = textEn || '';
    }

    return this.isExpanded() ? usedText : cutAtLastWholeWord(usedText, cutoffText || 200);
  }

  isHyperlink(item: ContentItem): item is ContentItemHyperlink {
    return item.contentType === EContentItem.Hyperlink;
  }

  isText(item: ContentItem): item is ContentItemText {
    return item.contentType === EContentItem.Text;
  }

  GetMarkdown() {
    let path: string | undefined = '';
    if (this.event().markdownCZContentPath) {
      path = this.event().markdownCZContentPath;
      if (this.languageService.current === ELanguage.En && this.event().markdownENContentPath) {
        path = this.event().markdownENContentPath;
      }
    }

    return path;
  }

  protected readonly T = T;
  protected readonly of = of;
}

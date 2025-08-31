import {Component, Input, signal, OnInit, WritableSignal, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventData} from '../../Models/event-data';
import {ModalComponent} from '../modal/modal.component';
import {ELanguage, LanguageService} from '../../services/language.service';
import {cutAtLastWholeWord} from '../../shared/utilities/string-extensions';
import {ButtonReadMoreComponent} from '../button-read-more/button-read-more.component';
import {T} from '../../shared/constants/text.tokens';
import {TextPipe} from '../../pipes/text.pipe';
import {of} from 'rxjs';
import {ContentItem, ContentItemHyperlink, ContentItemText, EContentItem} from '../../Models/content-item';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonReadMoreComponent, TextPipe],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event!: EventData;

  isExpanded = signal(false);
  description: WritableSignal<string> = signal('');
  title: WritableSignal<string> = signal('');
  postEventText: WritableSignal<string> = signal('');

  languageService = inject(LanguageService);

  ngOnInit() {
    if (!this.event) {
      console.error('Event data is not provided to the EventCardComponent');
      return;
    }

    this.description.set(this.resolveText(this.event.descriptionCs, this.event.descriptionEn));
    this.title.set(this.resolveText(this.event.titleCs, this.event.titleEn));
    this.postEventText.set(this.resolveText(this.event.postEventTextCs, this.event.postEventTextEn));
  }

  openModal() {
    this.isExpanded.set(true);
  }

  closeModal() {
    this.isExpanded.set(false);
  }

  public resolveText(textCs?: string, textEn?: string): string {
    if(!textCs && !textEn) {
      return '';
    }

    let usedText: string;
    if (this.languageService.current === ELanguage.Cs
      || (this.languageService.current === ELanguage.En && !textEn)) {
      usedText = textCs || '';
    } else {
      usedText = textEn || '';
    }

    return this.isExpanded() ? usedText : cutAtLastWholeWord(usedText, 2000);
  }

  isHyperlink(item: ContentItem): item is ContentItemHyperlink {
    return item.contentType === EContentItem.Hyperlink;
  }

  isText(item: ContentItem): item is ContentItemText {
    return item.contentType === EContentItem.Text;
  }

  protected readonly T = T;
  protected readonly of = of;
  protected readonly EContentItem = EContentItem;
  protected readonly ContentItemHyperlink = ContentItemHyperlink;
}

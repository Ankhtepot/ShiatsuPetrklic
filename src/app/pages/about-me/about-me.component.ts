import {Component, OnInit} from '@angular/core';
import {Category, ImageSize, ImagesService} from "../../services/images.service";
import {T} from '../../shared/constants/text.tokens';
import {ETextStyle, TextPipe} from "../../pipes/text.pipe";
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {QuoteStripComponent} from "../../Components/quote-strip/quote-strip.component";
import {randomizeArray} from '../../shared/utilities/randomize';
import {getTestimonials} from '../../shared/data/testimonials';
import {SeoService} from '../../services/seo.service';
import {EPages} from '../../services/navigation-link.service';
import {TextService} from '../../services/text.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  standalone: true,
    imports: [CommonModule, TextPipe, ContentCardComponent, QuoteStripComponent]
})
export class AboutMeComponent implements OnInit {
  profileImagePath: string = '';

  constructor(
    private imagesService: ImagesService,
    private seo: SeoService,
    private textService: TextService
  ) {
  }

  ngOnInit(): void {
    this.profileImagePath = this.imagesService.getRandomImageUrl(Category.Profile, ImageSize.Full) || '';
    this.seo.setSeo({
      title: this.textService.get(T.about_me_page_title),
      description: this.textService.get(T.about_me_page_description)
      // description: 'Learn more about the practitioner and their holistic Shiatsu therapy approach in Brno.'
    });

    this.seo.setCanonicalPage(EPages.AboutMe);
  }

  get randomizedTestimonials() {
    return randomizeArray(getTestimonials());
  }

  protected readonly Text = Text;
  protected readonly T = T;
  protected readonly ETextStyle = ETextStyle;
}

import {Component, OnInit} from '@angular/core';
import {Category, ImageSize, ImagesService} from "../../services/images.service";
import {T} from '../../shared/constants/text.tokens';
import {ETextStyle, TextPipe} from "../../pipes/text.pipe";
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  standalone: true,
  imports: [CommonModule, TextPipe, ContentCardComponent]
})
export class AboutMeComponent implements OnInit {
  profileImagePath: string = '';

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    this.profileImagePath = this.imagesService.getRandomImageUrl(Category.Profile, ImageSize.Full) || '';
  }

  protected readonly Text = Text;
  protected readonly T = T;
  protected readonly ETextStyle = ETextStyle;
}

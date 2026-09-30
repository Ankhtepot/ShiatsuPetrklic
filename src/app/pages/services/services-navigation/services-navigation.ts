import {Component, input, output} from '@angular/core';
import {DanceTantraSection, DefaultDanceTantraSections} from '../../../shared/models/common';


@Component({
  selector: 'app-services-navigation',
  standalone: true,
  templateUrl: './services-navigation.html',
  styleUrl: './services-navigation.scss',
})
export class ServicesNavigation {
  readonly sections = input<DanceTantraSection[]>(DefaultDanceTantraSections);
  readonly floating = input(false);
  readonly navigateToSection = output<string>();

  protected onSectionClick(sectionId: string): void {
    this.navigateToSection.emit(sectionId);
  }
}

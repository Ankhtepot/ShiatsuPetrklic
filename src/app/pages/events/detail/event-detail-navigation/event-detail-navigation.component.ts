import {Component, computed, input, output} from '@angular/core';
import {T} from '../../../../shared/constants/text.tokens';
import {TextPipe} from '../../../../pipes/text.pipe';
import {GenericButtonComponent} from '../../../../Components/button-general/button-generic.component';
import {AppColors} from '../../../../../styles/colors.gen';

export interface ItemsData {
  currentIndex: number;
  totalItems: number;
}

@Component({
  selector: 'app-event-detail-navigation',
  imports: [
    TextPipe,
    GenericButtonComponent
  ],
  templateUrl: './event-detail-navigation.component.html',
  styleUrls: ['./event-detail-navigation.component.scss'],
  standalone: true,
})
export class EventDetailNavigationComponent {
  itemsData = input<ItemsData>({ currentIndex: -1, totalItems: -1 });
  requestedIndexEmitted = output<number>();

  readonly buttonStyles = {
    width: '20em',
  };

  previousEventIndex = computed(() => {
    const { currentIndex } = this.itemsData();
    return currentIndex - 1 >= 0 ? currentIndex - 1 : -1;
  });

  nextEventIndex = computed(() => {
    const { currentIndex, totalItems } = this.itemsData();
    return currentIndex + 1 < totalItems  ? currentIndex + 1 : -1;
  });

  protected readonly T = T;
  protected readonly AppColors = AppColors;
}

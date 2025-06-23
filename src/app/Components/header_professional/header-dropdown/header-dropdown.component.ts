import { Component, Input, signal, WritableSignal, computed } from '@angular/core';
import {HeaderProfessionalDropdownAction, HeaderProfessionalDropdownActionsConfiguration} from '../models';

@Component({
  selector: 'app-professional-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.scss'],
  standalone: true
})
export class HeaderDropdownComponent {
  @Input({ required: true }) configuration!: HeaderProfessionalDropdownActionsConfiguration;

  dropdownOpen = signal(false);
  selectedItem: WritableSignal<HeaderProfessionalDropdownAction | undefined> =
    signal<HeaderProfessionalDropdownAction | undefined>(undefined);

  // Computed item shown on toggle button
  displayItem = computed(() =>
    this.selectedItem() ?? this.configuration.actions[this.configuration.selectedIndex]
  );

  toggleDropdown(): void {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  closeDropdown(): void {
    this.dropdownOpen.set(false);
  }

  selectItem(item: HeaderProfessionalDropdownAction): void {
    this.selectedItem.set(item);
    item.action();
    this.closeDropdown();
  }
}

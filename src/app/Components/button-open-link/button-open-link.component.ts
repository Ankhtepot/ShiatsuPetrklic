import {CommonModule} from '@angular/common';
import {Component, computed, input} from '@angular/core';
import {AppColors} from '../../../styles/colors.gen';

@Component({
  selector: 'app-button-open-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-open-link.component.html',
  styleUrls: ['./button-open-link.component.scss']
})
export class ButtonOpenLinkComponent {
  link = input.required<string>();
  label = input('');
  target = input<'_blank' | '_self' | '_parent' | '_top'>('_blank');
  disabled = input(false);
  width = input('20em');

  public styles = computed(() => ({
    color: AppColors.textOnOrange,
    backgroundColor: AppColors.lightPurple,
    border: 'none',
    width: this.width(),
    height: 'auto',
    fontSize: '1em',
    margin: '0.5em auto',
  }));

  onLinkClick(event: MouseEvent): void {
    if (this.disabled() || !this.link().trim()) {
      event.preventDefault();
    }
  }
}


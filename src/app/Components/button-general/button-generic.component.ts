import {Component, Input, computed, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppColors} from '../../../styles/colors.gen';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-generic.component.html',
  styleUrls: ['./button-generic.component.scss']
})
export class GenericButtonComponent {
  @Input() public label: string = '';

  @Input() public textColor?: string;
  @Input() public backgroundColor?: string;
  @Input() public border?: string;
  @Input() public width?: string;
  @Input() public height?: string;
  @Input() public fontSize?: string;
  @Input() public margin?: string;
  disabled = input(false);

  public styles = computed(() => ({
    color: this.textColor ?? AppColors.textOnOrange,
    backgroundColor: this.backgroundColor ?? AppColors.orangeGradientStart,
    border: this.border ?? 'none',
    width: this.width ?? '80%',
    height: this.height ?? 'auto',
    fontSize: this.fontSize ?? '1em',
    margin: this.margin ?? '0.5em auto',
  }));
}

import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-general.component.html',
  styleUrls: ['./button-general.component.scss']
})
export class GenericButtonComponent {
  @Input({ required: true }) public label!: string;
  // @Input({ required: true }) public onClick!: () => void;

  @Input() public textColor?: string;
  @Input() public backgroundColor?: string;
  @Input() public border?: string;
  @Input() public width?: string;
  @Input() public height?: string;
  @Input() public fontSize?: string;

  public styles = computed(() => ({
    color: this.textColor ?? '#ffffff',
    backgroundColor: this.backgroundColor ?? '#007bff',
    border: this.border ?? 'none',
    width: this.width ?? 'auto',
    height: this.height ?? 'auto',
    fontSize: this.fontSize ?? '1rem'
  }));
}

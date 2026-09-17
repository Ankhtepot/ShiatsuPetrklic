import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EPages} from '../../services/navigation-link.service';
import {NavigationLinkService} from '../../services/navigation-link.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  standalone: true
})
export class PricingComponent implements OnInit {
  private router = inject(Router);
  private navigation = inject(NavigationLinkService);

  ngOnInit(): void {
    this.router.navigateByUrl(this.navigation.getPageLink(EPages.Home, 'pricing'), {replaceUrl: true});
  }
}

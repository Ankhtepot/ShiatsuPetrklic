import {ExtraOptions, Routes} from '@angular/router';
import {AboutMeComponent} from './pages/about-me/about-me.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ContactComponent} from './pages/contact/contact.component';
import {HomeComponent} from './pages/home/home.component';
import {ServicesComponent} from './pages/services/services.component';
import {TestimonialsComponent} from './pages/testimonials/testimonials.component';
import {PricingComponent} from './pages/pricing/pricing.component';
import {LanguageRedirectComponent} from './Components/language-redirect.component';
import {EventsComponent} from './pages/events/events.component';
import {DetailComponent} from './pages/events/detail/detail.component';

export const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 20],
};

// Nested routes under language prefix
const localizedRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about-me', component: AboutMeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'events', component: EventsComponent},
  {path: 'events/details/:id', component: DetailComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'testimonials', component: TestimonialsComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

export const routes: Routes = [
  {path: '', component:LanguageRedirectComponent, pathMatch: 'full'},
  {
    path: ':lang',
    children: localizedRoutes
  }
];

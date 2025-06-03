import {ExtraOptions, Routes} from '@angular/router';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import {HomeComponent} from './pages/home/home.component';
import {ServicesComponent} from './pages/services/services.component';

export const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 20],
};

// Nested routes under language prefix
const localizedRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

export const routes: Routes = [
  { path: '', redirectTo: 'cs/about-me', pathMatch: 'full' },
  {
    path: ':lang',
    children: localizedRoutes
  }
];

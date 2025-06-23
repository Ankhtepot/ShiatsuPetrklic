import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  standalone: true,
  template: ''
})
export class LanguageRedirectComponent implements OnInit {
  private router = inject(Router);
  private languageService = inject(LanguageService);

  ngOnInit(): void {
    const lang = this.languageService.current;
    this.router.navigate([lang, 'about-me']);
  }
}

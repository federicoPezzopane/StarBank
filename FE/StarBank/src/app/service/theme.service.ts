// src/app/service/theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  constructor() {
    const saved = localStorage.getItem('dark-theme');
    this.darkMode = saved === 'true';
    this.updateBodyClass();
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('dark-theme', this.darkMode.toString());
    this.updateBodyClass();
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  private updateBodyClass() {
    if (this.darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }
}

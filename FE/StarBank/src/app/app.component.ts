import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
   isMobile = window.innerWidth <= 768;
  isLoading = true;
  starSpin = false;
  isDarkTheme = false;

  constructor(public themeService: ThemeService) {}

  ngOnInit() {

    this.isDarkTheme = document.body.classList.contains('dark-theme');
    

    setTimeout(() => {
      this.isLoading = false;
      this.starSpin = true;
    }, 1000);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = !this.isDarkTheme; 
  }
}

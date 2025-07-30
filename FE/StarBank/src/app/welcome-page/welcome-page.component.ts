import { Component, NgZone, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  host: {
    '[class.dark-theme]': 'isDarkTheme',
    '[class.light-theme]': '!isDarkTheme'
  }
})
export class WelcomePageComponent implements OnInit, AfterViewInit {
  starSpin = true;
  showWelcomeText = false;
  leftInView = false;
  rightInView = false;

  isDarkTheme = false;

  @ViewChild('leftCard', { static: true }) leftCard!: ElementRef;
  @ViewChild('rightCard', { static: true }) rightCard!: ElementRef;

  constructor(private zone: NgZone, private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkMode();
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.zone.run(() => {
              if (entry.target === this.leftCard.nativeElement) {
                this.leftInView = true;
                observer.unobserve(entry.target);
              }
              if (entry.target === this.rightCard.nativeElement) {
                this.rightInView = true;
                observer.unobserve(entry.target);
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(this.leftCard.nativeElement);
    observer.observe(this.rightCard.nativeElement);
  }

  ngOnInit() {
    setTimeout(() => {
      this.starSpin = false;
      this.showWelcomeText = true;
    }, 1500);
  }
   toggleTheme() {
    this.themeService.toggleTheme();
  }
}

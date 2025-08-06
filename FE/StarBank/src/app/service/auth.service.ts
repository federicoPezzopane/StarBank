import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Utente } from 'src/model/utente.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  login(username: string, password: string): Observable<{ token: string, utente: Utente }> {
    const body = { username, password };

    return this.http.post<{ token: string, utente: Utente }>(`${environment.apiBaseUrl}/auth/login`, body)
      .pipe(
        tap(res => {
          this.setCookie('token', res.token, 1);
          this.setCookie('utenteId', res.utente.userId!.toString(), 1);
        })
      );
  }

  logout(): void {
    this.deleteCookie('token');
    this.deleteCookie('utenteId');
    this.deleteCookie('utente');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.getCookie('token') !== null;
  }

  getUtenteId(): string | null {
    return this.getCookie('utenteId');
  }
  


  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    this.document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  private getCookie(name: string): string | null {
    const match = this.document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  private deleteCookie(name: string): void {
    const expires = 'Thu, 01 Jan 1970 00:00:00 UTC';

  this.document.cookie = `${name}=; expires=${expires}; path=/`;
  this.document.cookie = `${name}=; expires=${expires}; path=/area-riservata`;
  this.document.cookie = `${name}=; expires=${expires}; path=/login`;
  this.document.cookie = `${name}=; expires=${expires}; path=`;
}

}

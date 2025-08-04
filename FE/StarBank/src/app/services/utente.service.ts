import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utente } from 'src/model/utente.model';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { Provincia } from 'src/model/provincia.model';
import { Comune } from 'src/model/comune.model';
import { Regione } from 'src/model/regione.model';
import { Movimento } from 'src/model/movimento.model';


@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  effettuaBonifico(result: void): Observable<Movimento> {
     const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.cookieService.get('token')}`,
    'Content-Type': 'application/json'
  });
  return this.http.post<Movimento>(`${this.baseUrl}/findAll`, { headers });
  }
  getAllUtenti(): Observable<Utente[]> {
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.cookieService.get('token')}`,
    'Content-Type': 'application/json'
  });
  return this.http.get<Utente[]>(`${this.baseUrl}/findAll`, { headers });
  }

registraUtente(utente: any): Observable<Utente> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.cookieService.get('token')}`,
    'Content-Type': 'application/json'
  });
  return this.http.post<Utente>(`${this.baseUrl}/register`, utente, { headers });
}

   private baseUrl = environment.apiBaseUrl + '/utente';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUtenteById(id: number): Observable<Utente> {
    const token = this.cookieService.get('token');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Utente>(`${this.baseUrl}/findById/${id}`,{ headers });
  }
}

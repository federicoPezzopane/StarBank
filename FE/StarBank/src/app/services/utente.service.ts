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
import { UtenteDTO } from '../dto/UtenteDTO.model';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private baseUrl = environment.apiBaseUrl + '/utente';

  
  getAllUtenti(): Observable<Utente[]> {
  
  return this.http.get<Utente[]>(`${this.baseUrl}/findAll`, { headers: this.authService.getHeaders()  });
  }

registraUtente(utente: any): Observable<Utente> {
 
  return this.http.post<Utente>(`${this.baseUrl}/register`, utente, { headers:this.authService.getHeaders() });
}


aggiornaUtente(utenteAggiornato: UtenteDTO): Observable<any> {
  return this.http.put(`${this.baseUrl}/update`, utenteAggiornato, {headers: this.authService.getHeaders()});
}

   
  constructor(private http: HttpClient, private authService:AuthService) {}

  getUtenteById(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${this.baseUrl}/findById/${id}`,{  headers: this.authService.getHeaders()  });
  }


 
}

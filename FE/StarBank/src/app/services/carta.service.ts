import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from 'src/model/carta.model';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartaService {
  cancellaCarta(idCarta: any):Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/removeCarta/${idCarta}`,  { headers : this.authService.getHeaders() });
  }
  private baseUrl = environment.apiBaseUrl + '/carta';
  richiediCarta(userId: number, tipoCarta: string): Observable<Carta> {
    const body = { userId: userId, tipoCarta:tipoCarta }; 
    return this.http.post<Carta>(`${this.baseUrl}/addCarta`, body, { headers : this.authService.getHeaders() });
  }

  constructor(private authService: AuthService,private http: HttpClient) { }
}

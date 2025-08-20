import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fondo } from 'src/model/fondo.model';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FondoService {
  private baseUrl = environment.apiBaseUrl + '/fondo';
  getFondi() :Observable<Fondo[]>{
    return this.http.get<Fondo[]>(`${this.baseUrl}/getFondi`, { headers : this.authService.getHeaders() });
  }

  constructor(private http: HttpClient, private authService: AuthService) { }
}

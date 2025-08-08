import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Regione } from 'src/model/regione.model';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegioniService {

  private baseUrl = environment.apiBaseUrl + '/regione';
  
  constructor(private http: HttpClient, private authService: AuthService) {}
  

  getRegioni(): Observable<Regione[]> {
      
      return this.http.get<Regione[]>(`${this.baseUrl}/findAll`,{ headers : this.authService.getHeaders() });
    }
}

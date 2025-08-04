import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Regione } from 'src/model/regione.model';

@Injectable({
  providedIn: 'root'
})
export class RegioniService {

  private baseUrl = environment.apiBaseUrl + '/regione';
  
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  

  getRegioni(): Observable<Regione[]> {
      const token = this.cookieService.get('token');
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(token)
      return this.http.get<Regione[]>(`${this.baseUrl}/findAll`,{ headers });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimento } from 'src/model/movimento.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MovimentoService {
  private baseUrl = environment.apiBaseUrl + '/movimento';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  effettuaBonifico(bonificoData: any,ibanMittente: string): Observable<Movimento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('token')}`,
      'Content-Type': 'application/json'
    });
    const body = {
    ...bonificoData,
    ibanMittente: ibanMittente
  };
    return this.http.post<Movimento>(`${this.baseUrl}/addMovimento`, body, { headers });
  }
}

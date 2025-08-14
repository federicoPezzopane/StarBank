import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimento } from 'src/model/movimento.model';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovimentoService {
  private baseUrl = environment.apiBaseUrl + '/movimento';

  constructor(private http: HttpClient, private authService: AuthService) {}

  effettuaBonifico(bonificoData: any,ibanMittente: string): Observable<Movimento> {
       const body = {
    ...bonificoData,
    ibanMittente: ibanMittente
  };
    return this.http.post<Movimento>(`${this.baseUrl}/addMovimento`, body, { headers : this.authService.getHeaders() });
  }

  getEstrattoContoMeseCorrente(ibanId: number) {
  return this.http.get(`${this.baseUrl}/estratto-conto/${ibanId}`, {
    responseType: 'blob' ,
    headers : this.authService.getHeaders()
  });
}
}

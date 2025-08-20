import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';
import { Investimento } from 'src/model/investimento.model';

@Injectable({
  providedIn: 'root'
})
export class InvestimentoService {
  private baseUrl = environment.apiBaseUrl + '/investimento';
  nuovoInvestimento( fondoId: number, quantita: number, ibanId: number):Observable<Investimento> {
    const InvestimentoDto = {
      idFondo : fondoId,
      quantita : quantita,
      ibanId: ibanId
    }
   return this.http.post<Investimento>(`${this.baseUrl}/addInvestimento`, InvestimentoDto, { headers : this.authService.getHeaders() });
  }

  constructor(private http:HttpClient, private authService:AuthService) { }
}

// iban.model.ts
import { Carta } from './carta.model';
import { Investimento } from './investimento.model';
import { Movimento } from './movimento.model';
import { Prestito } from './prestito.model';
import { Utente } from './utente.model';


export interface Iban {
  ibanId: number;
  iban: string;
  saldoDisponibile: number;
  saldoContabile: number;
  utente?: Utente;
  investimenti?: Investimento[];
  prestiti?: Prestito[];
  carte?: Carta[];
  movimenti: Movimento[];
}

// investimento.model.ts
import { Fondo } from './fondo.model';
import { Iban } from './iban.model';

export interface Investimento {
  idInvestimento: number;
  quantita: number;
  prezzoAcquisto: number;
  valoreAttuale: number;
  iban: Iban;
  dataInvestimento: string; // o Date
  fondo: Fondo;
}

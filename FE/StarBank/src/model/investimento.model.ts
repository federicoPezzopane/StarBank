import { Fondo } from './fondo.model';
import { Iban } from './iban.model';

export interface ValoreFondo {
  id: number;
  dataValore: Date;
  valore: number;
}

export interface Investimento {
  idInvestimento: number;
  quantita: number;
  prezzoAcquisto: number;
  valoreAttuale: number;
  iban: Iban;
  dataInvestimento: string;
  fondo: Fondo;
  storicoValori: ValoreFondo[];
}

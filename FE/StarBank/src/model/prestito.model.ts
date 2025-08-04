// prestito.model.ts
import { Iban } from './iban.model';

export interface Prestito {
  idPrestito: number;
  importo: number;
  dataInizio: string;  // usa string o Date in base a come gestisci la data
  dataFine: string;
  tassoInteresse: number;
  iban: Iban;
}

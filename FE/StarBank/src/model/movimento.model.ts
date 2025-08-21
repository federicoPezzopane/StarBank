// movimento.model.ts
import { Iban } from './iban.model';

export interface Movimento {
  idMovimento: number;
  importo: number;
  ibanDestinazione?: Iban;
  iban?: Iban;
  tipoMovimento: string;
  dataMovimento: string;
  saldoPostMovimento: string;
  saldoPreMovimento: string;
  descrizione: string;
}

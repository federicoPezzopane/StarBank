// utente.model.ts
import { Comune } from './comune.model';
import { Iban } from './iban.model';

export interface Utente {
  userId: number;
  nome: string;
  cognome: string;
  eta: number;
  codiceFiscale: string;
  indirizzoResidenza: string;
  comuneResidenza?: Comune;
  isBlocked: boolean;
  username: string;
  password?: string; // opzionale non esporre la password in frontend
  failedLogins: number;
  roles: string;
  iban?: Iban;
  idComune: string;
}

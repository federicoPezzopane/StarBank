import { Comune } from './comune.model';
import { Iban } from './iban.model';

export class Utente {
  userId?: number;
  nome?: string;
  cognome?: string;
  eta?: number;
  codiceFiscale?: string;
  indirizzoResidenza?: string;
  comuneResidenza?: Comune;
  isBlocked?: boolean;
  username?: string;
  password?: string;
  failedLogins?: number;
  roles?: string;
  iban?: Iban;
  idComune?: string;

  constructor(init?: Partial<Utente>) {
    Object.assign(this, {
      userId: 0,
      nome: '',
      cognome: '',
      eta: 0,
      codiceFiscale: '',
      indirizzoResidenza: '',
      isBlocked: false,
      username: '',
      failedLogins: 0,
      roles: '',
      idComune: '',
      ...init
    });
  }
}

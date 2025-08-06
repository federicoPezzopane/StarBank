
export class UtenteDTO {
  userId?: number;
  nome?: string;
  cognome?: string;
  eta?: number;
  codiceFiscale?: string;
  indirizzoResidenza?: string;
  comuneResidenza?: number;

  constructor(init?: Partial<UtenteDTO>) {
    Object.assign(this, {
      userId: 0,
      nome: '',
      cognome: '',
      eta: 0,
      codiceFiscale: '',
      indirizzoResidenza: '',
      comuneResidenza: 0
    });
  }
}

// provincia.model.ts
import { Comune } from './comune.model';
import { Regione } from './regione.model';

export interface Provincia {
  idProvincia: number;
  nomeProvincia: string;
  siglaProvincia: string;
  regione: Regione;
  comuni?: Comune[]; // opzionale per lo stesso motivo
}

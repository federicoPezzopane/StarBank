// regione.model.ts

import { Provincia } from "./provincia.model";

export interface Regione {
  idRegione: number;
  nomeRegione: string;
  province: Provincia[]; // opzionale, perché potresti non averla sempre
}

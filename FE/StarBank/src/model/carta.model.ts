// carta.model.ts
import { Iban } from './iban.model';

export interface Carta {
  idCarta: number;
  tipoCarta: string;
  numeroCarta: number;
  cvv: number;
  circuito: string;
  iban: Iban;
}

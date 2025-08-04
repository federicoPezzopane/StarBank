// fondo.model.ts
import { Investimento } from './investimento.model';

export interface Fondo {
  idFondo: number;
  isin: string;
  nome: string;
  categoria: string;
  valuta: string;
  dataLancio: string; // o Date, se convertito
  rischio: number;
  patrimonio: number;
  societaGestione: string;
  fondoInvestimenti?: Investimento[];
}

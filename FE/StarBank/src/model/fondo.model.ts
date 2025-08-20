// fondo.model.ts
import { Investimento, ValoreFondo } from './investimento.model';

export interface Fondo {
  idFondo: number;
  isin: string;
  nome: string;
  categoria: string;
  valuta: string;
  dataLancio: string; 
  rischio: number;
  patrimonio: number;
  societaGestione: string;
  fondoInvestimenti?: Investimento[];
  storicoValori: ValoreFondo[]
}

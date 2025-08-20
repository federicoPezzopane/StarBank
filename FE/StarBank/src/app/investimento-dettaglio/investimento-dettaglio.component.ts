import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Investimento } from 'src/model/investimento.model';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-investimento-dettaglio',
  templateUrl: './investimento-dettaglio.component.html',
  styleUrls: ['./investimento-dettaglio.component.scss']
})
export class InvestimentoDettaglioComponent implements OnInit {
  investimento: Investimento;
  lineChartData: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'> = { responsive: true };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { investimento: Investimento },
    private dialogRef: MatDialogRef<InvestimentoDettaglioComponent>
  ) {
    this.investimento = data.investimento;
    this.lineChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Valore Fondo',
          fill: false,
          borderColor: 'blue'
        }
      ]
    };
  }

  ngOnInit(): void {
    console.log(this.investimento.fondo.storicoValori)
    const storico = this.investimento.fondo.storicoValori
      .sort((a, b) => new Date(a.dataValore).getTime() - new Date(b.dataValore).getTime());
    this.lineChartData.labels = storico.map(s => s.dataValore);
    this.lineChartData.datasets[0].data = storico.map(s => s.valore);
  }

  chiudi() {
    this.dialogRef.close();
  }
}

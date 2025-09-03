import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Investimento } from 'src/model/investimento.model';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { InvestimentoService } from '../services/investimento.service';
import { ConfirmCloseInvestimentoDialogComponent } from '../confirm-close-investimento-dialog/confirm-close-investimento-dialog.component';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    @Inject(MAT_DIALOG_DATA) public data: { investimento: Investimento, username : string },
    private dialogRef: MatDialogRef<InvestimentoDettaglioComponent>,
    private investimentoService : InvestimentoService,
    private authService : AuthService,
    private dialog: MatDialog,
    private toastr : ToastrService
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
    const storico = this.investimento.fondo.storicoValori
      .sort((a, b) => new Date(a.dataValore).getTime() - new Date(b.dataValore).getTime());
    this.lineChartData.labels = storico.map(s => s.dataValore);
    this.lineChartData.datasets[0].data = storico.map(s => s.valore);
  }

  chiudi() {
    this.dialogRef.close();
  }
  chiudiInvestimento() {
    const dialogRef = this.dialog.open(ConfirmCloseInvestimentoDialogComponent, {
    width: '600px',
      disableClose: true,
       panelClass: 'custom-dialog-panel', 
     backdropClass: 'custom-dialog-backdrop',
     data: {
      investimento: this.investimento,
      investimentoIniziale: this.investimento.quantita * this.investimento.prezzoAcquisto,
      valoreAttuale: this.investimento.quantita * this.investimento.valoreAttuale,
      profitto: (this.investimento.quantita * this.investimento.valoreAttuale) - (this.investimento.quantita * this.investimento.prezzoAcquisto),
      username : this.data.username
    }
  });
 dialogRef.afterClosed().subscribe(result  => {
if (result) { 
      this.investimentoService.chiudiInvestimento(this.investimento.idInvestimento).subscribe({
        next: () => {
          this.toastr.success("Investimento chiuso con successo");
          this.dialogRef.close('closed-investimento');
        },
        error: () => this.toastr.error("Password Errata, riprovare")
      });
    }
  });
}

}

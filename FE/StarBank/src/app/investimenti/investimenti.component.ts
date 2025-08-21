import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvestimentoService } from '../services/investimento.service';
import { AuthService } from '../service/auth.service';
import { Investimento } from 'src/model/investimento.model';
import { UtenteService } from '../services/utente.service';
import { Utente } from 'src/model/utente.model';
import { NuovoInvestimentoDialogComponent } from '../nuovo-investimento-dialog/nuovo-investimento-dialog.component';
import { InvestimentoDettaglioComponent } from '../investimento-dettaglio/investimento-dettaglio.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investimenti',
  templateUrl: './investimenti.component.html',
  styleUrls: ['./investimenti.component.scss']
})
export class InvestimentiComponent implements OnInit {
  utente: Utente = new Utente();
  investimenti: Investimento[] = [];
  totaleInvestito: number = 0;
  totaleGuadagno: number = 0;
  percentualePL: number = 0;
  isLoading = false;

  constructor(
    private investimentoService: InvestimentoService,
    private utenteService: UtenteService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadInvestimenti();
  }

  loadInvestimenti() {
    this.isLoading = true;
    const utenteIdStr = this.authService.getUtenteId();
    const utenteId = utenteIdStr ? Number(utenteIdStr) : null;
    if (!utenteId) {
      this.isLoading = false;
      return;
    };

    this.utenteService.getUtenteById(utenteId).subscribe({
      next: (data) => {
        this.utente = data;
        this.investimenti = data.iban?.investimenti || [];
        this.calcolaTotali();
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  calcolaTotali() {
  this.totaleInvestito = this.investimenti
    .reduce((sum, i) => sum + (i.quantita * i.prezzoAcquisto), 0);

  const valoreAttualeTotale = this.investimenti
    .reduce((sum, i) => sum + (i.quantita * i.valoreAttuale), 0);

  this.totaleGuadagno = valoreAttualeTotale - this.totaleInvestito;

  this.percentualePL = this.totaleInvestito > 0 
    ? (this.totaleGuadagno / this.totaleInvestito) * 100 
    : 0;
}

  apriNuovoInvestimento() {
    const dialogRef = this.dialog.open(NuovoInvestimentoDialogComponent, {
      width: '600px',
      disableClose: true,
       panelClass: 'custom-dialog-panel', 
     backdropClass: 'custom-dialog-backdrop',
      data : {username: this.utente.username, ibanId: this.utente.iban?.ibanId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.isLoading = true;
        this.loadInvestimenti();

      } 
    });
  }

  apriDettaglio(investimento: Investimento) {
    this.dialog.open(InvestimentoDettaglioComponent, {
      width: '800px',
      panelClass: 'custom-dialog-panel', 
     backdropClass: 'custom-dialog-backdrop',
      data: { investimento }
    });
  }
  tornaAreaRiservata() {
  this.router.navigate(['/area-riservata']); 
}
}


import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';
import { AuthService } from '../service/auth.service'; 
import { ThemeService } from '../service/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { BonificoDialogComponent } from '../bonifico-dialog/bonifico-dialog.component';
import { MovimentoService } from '../services/movimento.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../service/notification.service';
import { ModificaInformazioniDialogComponent } from '../modifica-informazioni-dialog/modifica-informazioni-dialog.component';
import { Utente } from 'src/model/utente.model';
import { UtenteDTO } from '../dto/UtenteDTO.model';
import { RichiestaCartaDialogComponent } from '../richiesta-carta-dialog/richiesta-carta-dialog.component';
import { CartaService } from '../services/carta.service';
import { ConfermaCancellazioneCartaDialogComponent } from '../conferma-cancellazione-carta-dialog/conferma-cancellazione-carta-dialog.component';
import { Carta } from 'src/model/carta.model';
import { MovimentoDettaglioDialogComponent } from '../movimento-dettaglio-dialog/movimento-dettaglio-dialog.component';
import { Movimento } from 'src/model/movimento.model';


@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.scss']
})
export class AreaRiservataComponent implements OnInit {
  utente: Utente=new Utente();
  isLoading = false;
  isDarkTheme = false;
  canRequestCard = false;
  showWelcomeToast: boolean = true;
  utenteDto:UtenteDTO = new UtenteDTO();
  entrateMese: number = 0;
  usciteMese: number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private utenteService: UtenteService,
    private authService: AuthService,
    private themeService: ThemeService,
    private dialog: MatDialog,
    private movimentoService: MovimentoService,
    public notificationService: NotificationService,
    private cartaService: CartaService
  ) {}
ibanMittente: string = ''; 
  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkMode();
    this.applyThemeClass();
    this.loadUtente();
    
    
  }
  private ordinaMovimentiPerData(): void {
  if (this.utente.iban?.movimenti?.length) {
   this.utente.iban.movimenti.sort((a, b) => {
  return b.idMovimento - a.idMovimento;
});
  }
}
public getUtente():Utente{
  return this.utente;
}
calcolaEntrateUsciteMeseCorrente() {
  const movimenti = this.utente?.iban?.movimenti || [];

  const oggi = new Date();
  const meseCorrente = oggi.getMonth(); // 0-11
  const annoCorrente = oggi.getFullYear();

  const movimentiMese = movimenti.filter(m => {
    const data = new Date(m.dataMovimento);
    return data.getMonth() === meseCorrente && data.getFullYear() === annoCorrente;
  });

  this.entrateMese = movimentiMese
    .filter(m => m.importo > 0)
    .reduce((sum, m) => sum + m.importo, 0);

  this.usciteMese = movimentiMese
    .filter(m => m.importo < 0)
    .reduce((sum, m) => sum + Math.abs(m.importo), 0);
}

  openBonificoDialog() {
  this.utenteService.getAllUtenti().subscribe((utenti) => {
    const dialogRef = this.dialog.open(BonificoDialogComponent, {
      width: '500px',
      disableClose: true, 
      autoFocus: false, 
      ariaLabel: 'Modale per bonifico', 
      panelClass: 'custom-dialog-panel',
  hasBackdrop: true,
  backdropClass: 'custom-dialog-backdrop',
      data: { utenti, ibanMittente: this.utente.iban, username: this.utente.username }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.movimentoService.effettuaBonifico(result,this.ibanMittente).subscribe(() => {
          
          this.refreshDatiUtente();
          this.notificationService.showSuccess(); });
      }
    });
  });
  
}
openModificaInformazioniDialog(): void {
  const dialogRef = this.dialog.open(ModificaInformazioniDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop',
      disableClose: true,
      autoFocus: false,
      ariaLabel: 'Modale per modifica info', 
    data: { 
      nome: this.utente.nome,
      cognome: this.utente.cognome,
      eta: this.utente.eta,
      indirizzoResidenza: this.utente.indirizzoResidenza,
      comuneResidenza: this.utente.comuneResidenza,
      codiceFiscale: this.utente.codiceFiscale
    }
  });


  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      result.userId = this.utente.userId
      this.utenteService.aggiornaUtente(result).subscribe(() => {
      this.notificationService.showSuccess('Informazioni aggiornate con successo!');
      this.refreshDatiUtente();
      });
    }
  });
}

openConfermaCancellazioneCartaDialog(carta: Carta): void {
  const dialogRef = this.dialog.open(ConfermaCancellazioneCartaDialogComponent, {
    width: '400px',
    disableClose: true,
    autoFocus: false,
    ariaLabel: 'Conferma cancellazione carta',
    panelClass: 'custom-dialog-panel',
    backdropClass: 'custom-dialog-backdrop',
    data: { numeroCarta: String(carta.numeroCarta), idCarta: carta.idCarta }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
       this.notificationService.showSuccess('Informazioni aggiornate con successo!');
      this.refreshDatiUtente();
     }
  });
}

scaricaEstrattoConto() {
  const ibanId = this.utente.iban?.ibanId;
  if (!ibanId) return;

  this.movimentoService.getEstrattoContoMeseCorrente(ibanId).subscribe((data: any) => {
    const blob = new Blob([data], { type: 'application/pdf' }); 
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estratto_conto_${new Date().toISOString().slice(0,7)}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  });
}



openRichiestaCartaDialog() {
  const dialogRef = this.dialog.open(RichiestaCartaDialogComponent, {
    width: '400px',
    disableClose: true,
    autoFocus: false,
    ariaLabel: 'Richiesta nuova carta',
    panelClass: 'custom-dialog-panel', 
     backdropClass: 'custom-dialog-backdrop',
    data: { utenteId: this.utente.userId }});

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
      this.loadUtente();
      this.notificationService.showSuccess('Carta richiesta con successo!');
    }
  });
}
  refreshDatiUtente() {
    this.loadUtente()
  }

  applyThemeClass() {
    const body = this.document.body;
    if (this.isDarkTheme) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }

  async loadUtente() {
    this.isLoading = true;

    const utenteIdStr = this.authService.getUtenteId();
    const utenteId = utenteIdStr ? Number(utenteIdStr) : null;
    if (!utenteId) {
      console.error('Cookie utenteId non trovato');
      this.isLoading = false;
      this.router.navigate(['/login']);
      return;
    }

    await this.utenteService.getUtenteById(utenteId).subscribe({
      next: (data) => {
        this.utente = data;
        console.log(data)
        this.ordinaMovimentiPerData();
        this.calcolaEntrateUsciteMeseCorrente();
        this.isLoading = false;
        if (this.utente && this.utente.iban && this.utente.iban.iban) {
        this.ibanMittente = this.utente.iban.iban;
      }
      if(this.showWelcomeToast==true){
      this.notificationService.showInfo("Benvenuto," + this.utente.nome,"Accesso")
      this.showWelcomeToast=false;
    }
   
    this.canRequestCard = this.utente.iban!.carte!.length>2
 
      
      },
      error: (err) => {
        console.error('Errore caricamento utente', err);
        this.isLoading = false;
        this.router.navigate(['/login']); 
      }
    });
    
  }

  logout() {
    this.isLoading = true;
  
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
      this.isLoading = false;
      this.notificationService.showInfo("Logout effettuato con successo", "Logout")
      
    }, 1500);
  }


  openMovimentoDettaglioDialog(movimento: Movimento) {
  this.dialog.open(MovimentoDettaglioDialogComponent, {
    width: '500px',
    data: movimento,
    panelClass: 'custom-dialog-panel', 
     backdropClass: 'custom-dialog-backdrop'
  });
}
}

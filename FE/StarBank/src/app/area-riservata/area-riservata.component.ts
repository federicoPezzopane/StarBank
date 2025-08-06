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

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.scss']
})
export class AreaRiservataComponent implements OnInit {
  utente: Utente=new Utente();
  isLoading = false;
  isDarkTheme = false;
  showWelcomeToast: boolean = true;
  utenteDto:UtenteDTO = new UtenteDTO();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private utenteService: UtenteService,
    private authService: AuthService,
    private themeService: ThemeService,
    private dialog: MatDialog,
    private movimentoService: MovimentoService,
    public notificationService: NotificationService
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
      data: { utenti, ibanMittente: this.utente.iban }
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

  loadUtente() {
    this.isLoading = true;

    const utenteIdStr = this.authService.getUtenteId();
    const utenteId = utenteIdStr ? Number(utenteIdStr) : null;
    if (!utenteId) {
      console.error('Cookie utenteId non trovato');
      this.isLoading = false;
      this.router.navigate(['/login']);
      return;
    }

    this.utenteService.getUtenteById(utenteId).subscribe({
      next: (data) => {
        this.utente = data;
        this.ordinaMovimentiPerData();
        console.log(this.utente.iban?.movimenti);

        this.isLoading = false;
        if (this.utente && this.utente.iban && this.utente.iban.iban) {
        this.ibanMittente = this.utente.iban.iban;
      }
      if(this.showWelcomeToast==true){
        console.log(this.showWelcomeToast)
      this.notificationService.showInfo("Benvenuto," + this.utente.nome,"Accesso")
      this.showWelcomeToast=false;
    }
      
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
}

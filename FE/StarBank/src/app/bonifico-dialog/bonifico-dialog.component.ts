import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-bonifico-dialog',
  templateUrl: './bonifico-dialog.component.html',
  styleUrls: ['./bonifico-dialog.component.scss']
})
export class BonificoDialogComponent implements OnInit {
  bonificoForm!: FormGroup;
  utenti: any[] = [];
  fase: number = 1; // 1 = inserimento, 2 = riepilogo

  constructor(
    public dialogRef: MatDialogRef<BonificoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    const ibanMittente = this.data.ibanMittente;
    this.utenti = this.data.utenti.filter((u: any) => u.iban.iban !== ibanMittente.iban);

    this.bonificoForm = this.fb.group({
      destinatarioIban: ['', Validators.required],
      importo: [null, [Validators.required, Validators.min(0.01)]],
      descrizione: [''],
      password: [''] 
    });
  }

 vaiARiepilogo(): void {
  
  if (this.bonificoForm.get('destinatarioIban')?.valid && this.bonificoForm.get('importo')?.valid) {
    const importo = this.bonificoForm.value.importo;
    const saldoDisponibile = this.data.ibanMittente.saldoDisponibile;

    if (importo > saldoDisponibile) {
      this.toastr.error('Saldo insufficiente per effettuare il bonifico', 'Errore');
      return;
    }

    this.bonificoForm.get('password')?.setValidators([Validators.required]);
    this.bonificoForm.get('password')?.updateValueAndValidity();

    this.fase = 2; 
  }
}
get passwordValida(): boolean {
  const pwd = this.bonificoForm.get('password');
  return pwd!.valid && pwd?.value?.trim().length > 0;
}

  confermaBonifico(): void {
  if (this.bonificoForm.valid) {
    const username = this.data.username;
    const password = this.bonificoForm.value.password;

    this.authService.login(username, password).subscribe({
      next: res => {
        const bonifico = { 
          ...this.bonificoForm.value, 
          tipoMovimento: 'bonifico' 
        };
        this.dialogRef.close(bonifico);
      },
      error: err => {
        this.toastr.error('Password errata', 'Errore');
      }
    });
  }
}

  annulla(): void {
    this.dialogRef.close();
  }
}

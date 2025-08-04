import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bonifico-dialog',
  templateUrl: './bonifico-dialog.component.html',
  styleUrls: ['./bonifico-dialog.component.scss']
})
export class BonificoDialogComponent implements OnInit {
  bonificoForm!: FormGroup;
  utenti: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<BonificoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    const ibanMittente = this.data.ibanMittente;
     this.utenti = this.data.utenti.filter((u: any) => u.iban.iban !== ibanMittente);
    this.bonificoForm = this.fb.group({
      destinatarioIban: ['', Validators.required],
      importo: [null, [Validators.required, Validators.min(0.01)]],
      descrizione: ['']
    });
  }

  inviaBonifico(): void {
    if (this.bonificoForm.valid) {
       const bonifico = this.bonificoForm.value;
    const importo = bonifico.importo;
    const saldoDisponibile = this.data.ibanMittente.saldoDisponibile;
  
    if (importo > saldoDisponibile) {
      console.log("sono nell'if")
      this.toastr.error('Saldo insufficiente per effettuare il bonifico', 'Errore');
      return;
    }
      bonifico.tipoMovimento = 'bonifico';
      this.dialogRef.close(bonifico); 
    }
  }
}

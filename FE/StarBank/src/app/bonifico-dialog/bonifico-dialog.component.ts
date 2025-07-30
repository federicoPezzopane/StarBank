import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
    private fb: FormBuilder
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
      bonifico.tipoMovimento = 'bonifico';
      this.dialogRef.close(bonifico); // ritorna i dati al componente chiamante
    }
  }
}

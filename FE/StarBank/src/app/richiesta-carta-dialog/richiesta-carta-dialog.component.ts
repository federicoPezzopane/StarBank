import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartaService } from '../services/carta.service';


@Component({
  selector: 'app-richiesta-carta-dialog',
  templateUrl: './richiesta-carta-dialog.component.html',
  styleUrls: ['../modifica-informazioni-dialog/modifica-informazioni-dialog.component.scss']
})
export class RichiestaCartaDialogComponent {
  cartaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RichiestaCartaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { utenteId: number },
    private cartaService: CartaService
  ) {
    this.cartaForm = this.fb.group({
      tipoCarta: ['', Validators.required]
    });
  }

  richiediCarta() {
    if (this.cartaForm.valid) {
      const tipoCarta = this.cartaForm.value.tipoCarta;

      this.cartaService.richiediCarta(this.data.utenteId, tipoCarta).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Errore durante richiesta carta:', err)
      });
    }
  }
}

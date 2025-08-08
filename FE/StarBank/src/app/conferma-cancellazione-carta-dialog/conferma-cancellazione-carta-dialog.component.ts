import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartaService } from '../services/carta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-conferma-cancellazione-carta-dialog',
  templateUrl: './conferma-cancellazione-carta-dialog.component.html',
  styleUrls: ['./conferma-cancellazione-carta-dialog.component.scss']
})
export class ConfermaCancellazioneCartaDialogComponent {
  cancellaCartaForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfermaCancellazioneCartaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { numeroCarta: string, idCarta: number },
    private cartaService : CartaService,
    private fb: FormBuilder
  ) {
      this.cancellaCartaForm = this.fb.group({
        numeroCarta: ['', Validators.required],
        idCarta: ['', Validators.required]
      });
      console.log(this.data.numeroCarta)
    }
  conferma(): void {
    
      this.cartaService.cancellaCarta(this.data.idCarta).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Errore durante richiesta carta:', err)
      });
    this.dialogRef.close(true);
  }

  annulla(): void {
    this.dialogRef.close(false);
  }
}

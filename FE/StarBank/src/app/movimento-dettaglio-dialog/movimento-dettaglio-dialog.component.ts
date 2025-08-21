import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movimento } from 'src/model/movimento.model';

@Component({
  selector: 'app-movimento-dettaglio-dialog',
  templateUrl: './movimento-dettaglio-dialog.component.html',
  styleUrls: ['./movimento-dettaglio-dialog.component.scss']
})
export class MovimentoDettaglioDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MovimentoDettaglioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movimento
  ) {}

  close(): void {
    console.log(this.data)
    this.dialogRef.close();
  }
}

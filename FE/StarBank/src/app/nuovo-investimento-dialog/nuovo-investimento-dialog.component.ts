import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvestimentoService } from '../services/investimento.service';

import { Fondo } from 'src/model/fondo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FondoService } from '../services/fondo.service';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ValoreFondo } from 'src/model/investimento.model';

@Component({
  selector: 'app-nuovo-investimento-dialog',
  templateUrl: './nuovo-investimento-dialog.component.html',
  styleUrls: ['./nuovo-investimento-dialog.component.scss']
})
export class NuovoInvestimentoDialogComponent implements OnInit {
  fondi: Fondo[] = [];
  form: FormGroup;
  fase: number = 1;
  fondoSelezionato: Fondo | null = null;
  valoreAttuale: number | null = null

  constructor(
    private dialogRef: MatDialogRef<NuovoInvestimentoDialogComponent>,
    private fondoService: FondoService,
    private investimentoService: InvestimentoService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      fondoId: [null, Validators.required],
      quantita: [0, [Validators.required, Validators.min(1)]],
      confermaPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fondoService.getFondi().subscribe(f => this.fondi = f);
    console.log(this.fondi)
  }

  selezionaFondo() {
    const id = this.form.value.fondoId;
    this.fondoSelezionato = this.fondi.find(f => f.idFondo === id) || null;
    this.valoreAttuale = this.fondoSelezionato?.storicoValori[this.fondoSelezionato?.storicoValori.length-1]?.valore || 0;
    if (this.fondoSelezionato) this.fase = 2;
  }

  confermaInvestimento() {
    if (!this.form.valid || !this.fondoSelezionato) return;
    this.authService.login(this.data.username,this.form.value.confermaPassword).subscribe({
        next: res => {
          this.investimentoService.nuovoInvestimento(this.fondoSelezionato!.idFondo,
          this.form.value.quantita, this.data.ibanId).subscribe(() => this.dialogRef.close(true));
          this.toastr.success("Investimento effettuto con successo")
          this.dialogRef.close();
        },
        error: err => {
          this.toastr.error('Password errata', 'Errore');
        }
      });
      
    
  }

  chiudi() {
    this.dialogRef.close(false);
  }
}

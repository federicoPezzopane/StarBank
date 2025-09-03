import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-close-investimento-dialog',
  templateUrl: './confirm-close-investimento-dialog.component.html',
  styleUrls: ['./confirm-close-investimento-dialog.component.scss']
})
export class ConfirmCloseInvestimentoDialogComponent {
  investimentoIniziale: number;
  valoreAttuale: number;
  profitto: number;
  password: string = '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmCloseInvestimentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  , private toastr : ToastrService
  ) {
    this.investimentoIniziale = data.investimentoIniziale;
    this.valoreAttuale = data.valoreAttuale;
    this.profitto = data.profitto;
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.authService.login(this.data.username,this.password).subscribe({
      
        next: res => {
         this.dialogRef.close(true);
        },
        error: err => {
          console.log(this.password)
          console.log(this.data)
          this.toastr.error('Password errata', 'Errore');
        }
      });
    
  }
}

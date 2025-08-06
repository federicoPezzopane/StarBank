import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comune } from 'src/model/comune.model';
import { Provincia } from 'src/model/provincia.model';
import { Regione } from 'src/model/regione.model';
import { RegioniService } from '../services/regioni.service';

@Component({
  selector: 'app-modifica-informazioni-dialog',
  templateUrl: './modifica-informazioni-dialog.component.html',
  styleUrls: ['./modifica-informazioni-dialog.component.scss']
})
export class ModificaInformazioniDialogComponent implements OnInit {
   modificaForm!: FormGroup;
  regioni: Regione[] = [];
  province: Provincia[] = [];
  comuni: Comune[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModificaInformazioniDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private regioniService: RegioniService 
  ) {}

  ngOnInit(): void {
    this.modificaForm = this.fb.group({
      nome: [this.data.nome, Validators.required],
      cognome: [this.data.cognome, Validators.required],
      eta: [this.data.eta, Validators.required],
      indirizzoResidenza: [this.data.indirizzoResidenza, Validators.required],
      comuneResidenza: [this.data.comuneResidenza?.nomeComune, Validators.required],
      codiceFiscale: [this.data.codiceFiscale, Validators.required],
      regione: [null, Validators.required],
     provincia: [null, Validators.required],
    comune: [null, Validators.required]

    })
    this.regioniService.getRegioni().subscribe(regioniData => {
      this.regioni = regioniData;

      if (this.data.comuneResidenza && this.data.comuneResidenza.idComune) {
  
        this.preselectComune(this.data.comuneResidenza);
      }
    });

    
    this.modificaForm.get('regione')?.valueChanges.subscribe(idRegione => {
      this.onRegioneChange(idRegione);
    });

    
    this.modificaForm.get('provincia')?.valueChanges.subscribe(idProvincia => {
      this.onProvinciaChange(idProvincia);
    });
  }

  
private preselectComune(comuneToSelect: Comune): void {
  
    const foundRegione = this.regioni.find(r =>
      r.province.some(p => p.comuni?.some(c => c.idComune === comuneToSelect.idComune))
    );

    if (foundRegione) {
      this.modificaForm.get('regione')?.setValue(foundRegione.idRegione, { emitEvent: false });
      
      
      this.province = foundRegione.province ?? [];

      
      const foundProvincia = foundRegione.province.find(p =>
        p.comuni?.some(c => c.idComune === comuneToSelect.idComune)
      );

      if (foundProvincia) {
        this.modificaForm.get('provincia')?.setValue(foundProvincia.idProvincia, { emitEvent: false });
        
        
        this.comuni = foundProvincia.comuni ?? [];
        
        this.modificaForm.get('comune')?.setValue(comuneToSelect.idComune, { emitEvent: false });
    
      }
    }
  }

  onRegioneChange(idRegione: number) {
    const regioneSelezionata = this.regioni.find(r => r.idRegione === idRegione);
    this.province = regioneSelezionata?.province ?? [];
    this.comuni = []; 
   this.modificaForm.get('provincia')?.setValue(null, { emitEvent: false });
  this.modificaForm.get('comune')?.setValue(null, { emitEvent: false });
  }

 onProvinciaChange(idProvincia: number) {
  const provinciaSelezionata = this.province.find(p => p.idProvincia === idProvincia);
  this.comuni = provinciaSelezionata?.comuni ?? [];
  console.log(this.comuni)
  this.modificaForm.get('comune')?.setValue(null); 
}

  salvaModifiche(): void {
    if (this.modificaForm.valid) {
      const formValue = this.modificaForm.value;
      const comuneSelezionato = formValue.comune; 

      
      const result = {
        userId:0,
        nome: formValue.nome,
        cognome: formValue.cognome,
        eta: formValue.eta,
        indirizzoResidenza: formValue.indirizzoResidenza,
        codiceFiscale: formValue.codiceFiscale,
        comuneResidenza: comuneSelezionato 
      };
      this.dialogRef.close(result);
    }
  }
}

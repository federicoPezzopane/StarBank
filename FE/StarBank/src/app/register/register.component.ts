import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comune } from 'src/model/comune.model';
import { Provincia } from 'src/model/provincia.model';
import { Regione } from 'src/model/regione.model';
import { RegioniService } from '../services/regioni.service';
import { UtenteService } from '../services/utente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  step = 1;

  anagraficaForm: FormGroup = new FormGroup({});
  credenzialiForm: FormGroup= new FormGroup({});

  regioni: Regione[] = [];
  province: Provincia[] = [];
  comuni: Comune[] = [];
  idComune: string="";

  constructor(
    private fb: FormBuilder,
    private regioniService: RegioniService,
    private utenteService: UtenteService,private router: Router  
  ) {}

  ngOnInit() {
    this.anagraficaForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      codiceFiscale: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      eta: ['', [Validators.required, Validators.min(18)]],
      indirizzoResidenza: ['', Validators.required],
      regione: ['', Validators.required],
      provincia: ['', Validators.required],
      comune: ['', Validators.required]
    });

    this.credenzialiForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.regioniService.getRegioni().subscribe(data => {
      this.regioni = data;
    });
    

    // Reset province e comuni se cambia la regione o la provincia
    this.anagraficaForm.get('regione')?.valueChanges.subscribe(idRegione => {
      this.onRegioneChange(idRegione);
    });

    this.anagraficaForm.get('provincia')?.valueChanges.subscribe(provincia => {
      this.onProvinciaChange(provincia.idProvincia);
    });

     this.anagraficaForm.get('comune')?.valueChanges.subscribe(comune => {
      this.idComune=comune.idComune
      console.log(JSON.stringify(comune, null, 3))
    });
  }

  get isStep1() {
  return this.step === 1;
}

get isStep23() {
  return this.step === 2 || this.step === 3;
}

goToLogin() {
  this.router.navigate(['/login']);
}

 onRegioneChange(idRegione: any) {
  const id = Number(idRegione); 
  const regioneSelezionata = this.regioni.find(r => r.idRegione === id);
  this.province = regioneSelezionata?.province ?? [];
  

}
onProvinciaChange(idProvincia: number) {
  const provincia = this.province.find(p => p.idProvincia === Number(idProvincia));
  console.log( provincia )
  this.comuni = provincia?.comuni ?? [];
  console.log(this.comuni)

}

  goToStep(step: number) {
    this.step = step;
  }

  submit() {
    if (this.anagraficaForm.valid && this.credenzialiForm.valid) {
      const utente = {
        ...this.anagraficaForm.value,
        ...this.credenzialiForm.value
      };
      
      utente.idComune=this.idComune
      this.utenteService.registraUtente(utente).subscribe(() => {
        this.step = 3; 
      });
    }
  }
}

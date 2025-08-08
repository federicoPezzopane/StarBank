import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { BonificoDialogComponent } from './bonifico-dialog/bonifico-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { ModificaInformazioniDialogComponent } from './modifica-informazioni-dialog/modifica-informazioni-dialog.component';
import { RichiestaCartaDialogComponent } from './richiesta-carta-dialog/richiesta-carta-dialog.component';
import { ConfermaCancellazioneCartaDialogComponent } from './conferma-cancellazione-carta-dialog/conferma-cancellazione-carta-dialog.component';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
};

@NgModule({
  declarations: [AppComponent,WelcomePageComponent, LoginComponent, AreaRiservataComponent, RegisterComponent, BonificoDialogComponent, ModificaInformazioniDialogComponent, RichiestaCartaDialogComponent, ConfermaCancellazioneCartaDialogComponent],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true,
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule ,
     MatSelectModule,
     ReactiveFormsModule,
     MatNativeDateModule,
     MatDialogModule
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

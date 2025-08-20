import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { InvestimentiComponent } from './investimenti/investimenti.component';

const routes: Routes = [
{ path: '', component: WelcomePageComponent },
{ path: 'login', component: LoginComponent},
{ path: 'area-riservata', component: AreaRiservataComponent, canActivate: [AuthGuard] },
{ path: 'register', component: RegisterComponent},
{path: 'investimenti', component: InvestimentiComponent, canActivate: [AuthGuard] }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

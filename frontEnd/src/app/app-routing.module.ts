import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  {path:'',
component:HomeComponent},
  {
    path:'registration',
    component:RegistrationComponent,
    canActivate:[AuthGuardService],
  },{
    path:'login',
    component:LoginComponent,
    canActivate:[AuthGuardService]
  },{
    path:"**",
    redirectTo:''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

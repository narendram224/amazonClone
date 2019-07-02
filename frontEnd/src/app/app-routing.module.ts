import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './profile/setting/setting.component';


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
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'profile/setting',
    component:SettingComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:"**",
    redirectTo:''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

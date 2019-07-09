import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './profile/setting/setting.component';
import { AddressComponent } from './profile/address/address.component';
import { CategoryComponent } from './prodcuts/category/category.component';
import { PostProductsComponent } from './prodcuts/post-products/post-products.component';
import { CategoriesComponent } from './prodcuts/categories/categories.component';
import { ProductsComponent } from './prodcuts/products/products.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './prodcuts/cart/cart.component';


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
    path:'profile/address',
    component:AddressComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'categories',
    component:CategoryComponent,
    
  },
  {
    path:'search',
    component:SearchComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
    {
      path:'categories/:id',
      component:CategoriesComponent
    },
    {
      path:'product/:id',
      component:ProductsComponent
    },
  {
    path:'profile/postProducts',
    component:PostProductsComponent,
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

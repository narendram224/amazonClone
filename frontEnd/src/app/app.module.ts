import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule} from  '@angular/forms';
import  {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { RestApiService } from './rest-api.service';
import { MessageComponent } from './message/message.component';
import { DataService } from './data.service';
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


 @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    SettingComponent,
    AddressComponent,
    CategoryComponent,
    PostProductsComponent,
    CategoriesComponent,
    ProductsComponent,
    SearchComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
    ,FormsModule,
    HttpClientModule
  ],
  providers: [RestApiService,DataService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

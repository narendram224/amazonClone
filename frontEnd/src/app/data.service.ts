import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Router, NavigationStart } from '@angular/router';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
message = '';
meesageType ="danger";
user :any;
  constructor(private router:Router,private restApi:RestApiService) {
      this.router.events.subscribe(event=>{
          if (event instanceof NavigationStart) {
              this.message = '';
          }
      })
   }

   error(message){
     this.meesageType = 'danger';
     this.message = message;

   }
   success(message){
    this.meesageType = 'success';
    this.message = message;
    
  }
  warning(message){
    this.meesageType = 'warning';
    this.message = message;
    
  }
  getToken(){
    return !!localStorage.getItem('token');
  }

  async getProfile(){
      try {
        if (this.getToken) {
          const data  = await this.restApi.get(
            "http://localhost:3000/api/accounts/profile"
          );
          this.user = data['user'];
      }
      } catch (error) {
          this.error(error);
      }
  }
}

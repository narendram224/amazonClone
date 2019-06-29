import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
message = '';
meesageType ="danger";
user :any;
  constructor(private router:Router) {
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
   successs(message){
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
}

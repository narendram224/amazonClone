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
  cartItems  =0;
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

    getCart(){
      const cart  =localStorage.getItem('cart');
      return cart?JSON.parse(cart):[];
    }
    addToCart(item:string){
        const cart:any = this.getCart();
        if (cart.find(data=>JSON.stringify(data)===JSON.stringify(item))) {
          return false;

        }
        else{
          cart.push(item);
          this.cartItems++;
          localStorage.setItem('cart',JSON.stringify(cart));
          return true;
        }
    }

    clearCart(){
      this.cartItems = 0;
      localStorage.setItem('cart','[]');
    }

    removeFromCart(item:string){
        let cart:any = this.getCart();
        if (cart.find(data=>JSON.stringify(data)===JSON.stringify(item))) {
            cart =cart.filter(data=>JSON.stringify(data)!== JSON.stringify(item));
            this.cartItems--;
            localStorage.setItem('cart',JSON.stringify(    'cart'))
        }
    }
  async getProfile(){
      try {
        if (localStorage.getItem('token')) {
          const data  = await this.restApi.get(
            "http://localhost:3000/api/accounts/profile"
          );
          this.user = data['user'];
          // console.log(data);
      }
      } catch (error) {
          this.error(error);
      }
  }
}

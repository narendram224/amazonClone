import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import {  environment } from 'src/environments/environment';

declare var StripeCheckOut:StripeCheckoutStatic;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    btnDisabled = false;
    handler:StripeCheckoutHandler;
    
    quantities = [];

  constructor(private dataser:DataService,private router:Router,private restApi:RestApiService) { }

  trackByCartItems(index:number,item:any){
    return item._id;

  }

  get CartItmes(){
    return this.dataser.getCart();
  }

  get cartTotal(){
    let Total = 0;
    this.CartItmes.forEach((data,index) => {
      Total += data['price']* this.quantities['index'];
    });
    return Total;
  }

  removeProduct (index,product){
    this.quantities.splice(index,1);
    this.dataser.removeFromCart(product);
  }

  ngOnInit() {
    this.CartItmes.forEach(data=>{
      this.quantities.push(1);  
    });
    
    this.handler =StripeCheckOut.configure({
      key:environment.stripeKey,
      image:'assets/img/img1.jpg',
      locale: 'auto',
      token: async stripeToken=>{
        let products;
        products = [];
        this.CartItmes.forEach((d,index) => {
          products.push({
            products:d['_id'],
            quantity:this.quantities[index]
          });
        });
        try {
          const data  = await this.restApi.post(
            'http://localhost:3000/api/payment',{
              totalPrice:this.cartTotal,
              products,
              stripeToken
            }
          );
          data['success']
          ? (this.dataser.clearCart(), this.dataser.success('purchase succesfully'))
          : this.dataser.error(data['messgage']);

        } catch (error) {
          this.dataser.error(error['message']);
        }
      }

    })
  }

  validate(){
    if (! this.quantities.every(data=> data>0)) {
      this.dataser.warning('Quantity cannot be less then one ');
    }else if(!localStorage.getItem('token')){
      this.router.navigate(['/login'])
      .then(()=>{
        this.dataser.warning('you need to login before making a purchase');
      });

    }else if(!this.dataser.user['address']){
      this.router.navigate(['profile/address'])
      .then(()=>{
        this.dataser.warning('you need login making a purchase');

      });
    }else{
      this.dataser.message  = '';
      return true;

    }

  }

  checkout(){
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        this.handler.open({
          name:'amazone clone',
          description: ' Checkout payment ',
          amount: this.cartTotal*100,
        });
          close:()=>{
            this.btnDisabled = false;
          }
      

      }else{
        this.btnDisabled = false
      }
    } catch (error) {
      this.dataser.error(error['messgage']);
    }
  }
}

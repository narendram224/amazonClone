import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product:any;
    myReview={
      title:'',
      description: '',
      rating:0
    };
    btnDisabled = false
    constructor(private dataser:DataService ,private restApi:RestApiService,private router:Router,
      private activatedRoutes:ActivatedRoute) { }

 async ngOnInit() {
    this.activatedRoutes.params.subscribe(res=>{
      console.log(res['id']);
        this.restApi.get(
          `http://localhost:3000/api/products/${res['id']}`
        ).then(data=>{
          data['success']
          ? (this.product = data['product'])
          :this.router.navigate(['/']);

          console.log(res['id']);
        }).catch(error=> this.dataser.error(error['message']));
    })
  }

  async postReview(){
    this.btnDisabled = true;
    try {
        const data = await  this.restApi.post(
          'http://localhost:3000/api/review',{
            productId:this.product._id,
            title:  this.myReview.title,
            description:this.myReview.description,
            rating:this.myReview.rating,
          }

        )
        data['success']
        ? this.dataser.success(data['message'])
        : this.dataser.error(data['message']);
    } catch (error) {
      this.dataser.error(error['message']);
    }
    this.btnDisabled = false;
  }


  addToCart(){
    this.dataser.addToCart(this.product)
    ? this.dataser.success('product succesfully added to cart')
    : this.dataser.error('product has already been added to cart')
  }
}

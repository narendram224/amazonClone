import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-post-products',
  templateUrl: './post-products.component.html',
  styleUrls: ['./post-products.component.scss']
})
export class PostProductsComponent implements OnInit {

    products = {
      title:'',
      price:0 ,
      categoryId:'',
      description: '',
      product_picture:null

    }
    categories:any;
    btnDisabled = false;

  constructor(private router:Router,private dataser:DataService, private restApi:RestApiService) { }

async  ngOnInit() {
      try {
        const data = await this.restApi.get("http://localhost:3000/api/categories");
        data['success']
        ? (this.categories = data['categories'])
        : (this.dataser.error(data['message']));
      } catch (error) {
        this.dataser.error(error['message']);
      }
  }

  validate(product){
    if (product.title) {
      if (product.price) {
        if (product.categoryId) {
          if (product.description) {
            if (product.product_picture) {
              return true;
            }else{
              this.dataser.error('please select the image');
              
            }
          }else{
            this.dataser.error("ente the description");
          }
        }else{
          this.dataser.error("enter the categories");
        }
      }else{
        this.dataser.error("enter the price");
      }
    }else{
      this.dataser.error("enter the title");
    }
  }

  fileChange(event:any){
    this.products.product_picture = event.target.files[0];
  }

  async post(){
    this.btnDisabled = true;

      try {
          if (this.validate(this.products)) {
            const form = new FormData();
            for (const key in this.products) {
              if (this.products.hasOwnProperty(key)) {
                  if (key==='product_picture') {
                    form.append(
                      'product_picture',
                      this.products.product_picture,
                      this.products.product_picture.name
                    );
                  }else{
                    form.append(key,this.products[key]);
                  }
              }
              
            }
            const data = await this.restApi.post(
              'http://localhost:3000/api/seller/products',
              form
            );
            data['success']
            ? this.dataser.success(data['message'])
            : this.dataser.error(data['message']);
          } 
      } catch (error) {
        this.dataser.error(error['message']);
        this.btnDisabled = true;
      }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    category:any;
    categoryId:any;
    page=1;
  constructor(private activasateroute:ActivatedRoute, private dataser:DataService, private restApi:RestApiService) { }

  ngOnInit() {
    this.activasateroute.params.subscribe(res=>{
        this.categoryId  = res['id'];
        this.getProducts();
    })
  }

  get lower(){
    return 10*(this.page - 1)+ 1 ;
  }

  get upper(){
    return Math.min(10*this.page ,this.category.totalProducts);
  }

  async getProducts(event?:any){
    if (event){
      this.category = null;
    }
    try {
      const data  = await this.restApi.get(
        `http://localhost:3000/api/categories/${this.categoryId}?page=${this.page -1}`
      )
     
      data['success']
      ? (this.category  = data)
      : this.dataser.error(data['message']);
      // console.log(data);
        console.log(this.category.products);
    } catch (error) {
      this.dataser.error(error['message']);
    }
  }
}

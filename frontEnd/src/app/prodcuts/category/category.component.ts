import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    categories:any;

    newCategories = '';
    btDiabled = false;
  constructor(private dataser:DataService,private restApi:RestApiService) { }

 async ngOnInit() {
    try {
        const data = await this.restApi.get(
          'http://localhost:3000/api/categories'
        );
        data['success']
        ?(this.categories = data['categories'])
        :(this.dataser.error(data['message']));
    } catch (error) {
      this.dataser.error(error['message']);
    }
  }

  async addCategories(){
    this.btDiabled = true;

    try {
        const data = await this.restApi.post(
          'http://localhost:3000/api/categories',
          {category:this.newCategories}
        );
        data['success']
        ? this.dataser.success(data['message'])
        : this.dataser.error(data['message']);
        
    } catch (error) {
      this.dataser.error(error['message'])
    }
  }

}

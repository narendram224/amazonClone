import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    products:any;

  constructor(private resApi:RestApiService,private dataser:DataService) { }

 async ngOnInit() {
    try {
        const data = await this.resApi.get('http://localhost:3000/api/products/');
        console.log(data);
        data['success']
        ?(this.products  = data['products'])
        : this.dataser.error(data['could not fetch products']);
    } catch (error) {
      this.dataser.error(error['message']);
    }
  }

}

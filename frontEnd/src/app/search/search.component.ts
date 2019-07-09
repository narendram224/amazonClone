import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    query:any;
    page = 1;
    content:any;

  constructor(private datasev:DataService,private restApi:RestApiService , private activatedRoutes:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoutes.params.subscribe(res=>{
        this.query = res['query'];
        this.page = 1;
        this.getProducts();

    })
  }

  get lower(){
    return 1+ this.content.hitsPerPage*this.content.page;
  }

  get upper(){
    return Math.min(
      this.content.hitsPerPage * (this.content.page *1),
      this.content.nbHits

    );
  }

  async getProducts(){
    this.content = null;

      try {
        const data  =  await this.restApi.get(
          `http://localhost:3000/api/search?query=${this.query}&page=${this.page -1}`
        );
          console.log(data['content']);
        data['success']
        ? (this.content = data['content'])
        :this.datasev.error(data['messgae']);
        
      } catch (error) {
        this.datasev.error(error['message']);
      }
  }

}

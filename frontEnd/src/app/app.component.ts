import { Component } from '@angular/core';
import { DataService } from './data.service';
import { RestApiService } from './rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchterm="";
  isCollapsed = true;
  token= null;

  constructor(private dataSer:DataService,private restApiServ:RestApiService,private router:Router){
      this.dataSer.getProfile();
      this.dataSer.cartItems = this.dataSer.getCart().length;
  }
  getToken(){
    return localStorage.getItem('token');
  }
  collapse(){
    this.isCollapsed  = true;
    
  }

closeDropdown(dropdown){
  dropdown.close();
}

  logout(){
      this.dataSer.user ={};
      localStorage.clear();
      this.dataSer.cartItems = 0;
      this.router.navigate(['']);

  }

  search(){
    
      if (this.searchterm) {
        this.collapse();
        this.router.navigate(['search',{query:this.searchterm}]);
        
      }
  }
}

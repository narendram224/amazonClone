import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email= '';
  password='';
    btndisabled = false;
  constructor(private dataServ:DataService,private restApiServ:RestApiService,private router:Router) { }

  ngOnInit() {
  }

validation(){
  if (this.email) {
    if (this.password) {
     return true;

    }else{
      this.dataServ.error("password donot entered");
    }
  }else{
    this.dataServ.error("email is not entered");
  }
}

async login(){
  this.btndisabled = true;
    try {
        if (this.validation()) {
          console.log("email and pas",this.email,this.password);  
          const data  = await this.restApiServ.post("http://localhost:3000/api/accounts/login",
          {
            email:this.email,
            password:this.password
          });

          if (data['success']) {
            localStorage.setItem('token',data['token']);
            await this.dataServ.getProfile();
            this.router.navigate(['/']);
          }else{
            this.dataServ.error(data['message']);

          }
        }
    } catch (error) {
      this.dataServ.error(error['message']);
      this.btndisabled = false;
    }
}
}

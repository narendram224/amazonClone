import { Component, OnInit } from '@angular/core';
import {Register} from '../../models/registration.model'
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    name = '';
    email  ='';
    password='';
    password1='';
    isSeller = false;

    btnDisable = false;

  constructor(private router:Router,private dataserv:DataService,private restApiServ:RestApiService) { }

  ngOnInit() {
  }

  validation(){
      if (this.name) {
        if (this.email) {
          if (this.password) {
            if(this.password1){
              if (this.password ===this.password1) {
                return true;
              }else{
                this.dataserv.error("password do not match");
              }
            }else{
              this.dataserv.error(" conform password is empty");
              
            }
          }else{
            this.dataserv.error("password is emplty");
          }
        }else{
          this.dataserv.error("email is not entered");
        }
      }else{
        this.dataserv.error("name is not entered");
      }
  }

  async register(){
    this.btnDisable =  true;

    console.log(this.name,this.email,this.isSeller,this.password);
    try {
      if (this.validation()) {
        const data = await this.restApiServ.post('http://localhost:3000/api/accounts/signup',
      {
          name:this.name,
          email:this.email,
           password:this.password,
          isSeller:this.isSeller,
      });
      if (data['success']) {
          localStorage.setItem('token',data['token']);
          this.dataserv.successs("registraion is succesfull");
      }else{
        this.dataserv.error(data['message']);
      }
    }

    } catch (err) {
        this.dataserv.error(err['message']);
        this.btnDisable =  false;
    }
      }
     
  

}

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    btndisabled = false;
    currentsetting:any;
  constructor(private dataser:DataService,private restApi:RestApiService) { }

 async ngOnInit() {
   try {
          if (!this.dataser.user) {
              await this.dataser.getProfile();
          }
          this.currentsetting = Object.assign({
            newPwd:'',
            pwdConfirm:'',
          },this.dataser.user)
        } catch (error) {
        this.dataser.error(error);
        }
  }

  validate(settings){
      if (settings['name']) {
          if (settings['email']) {
            if (settings['newPwd']) {
              if (settings['pwdConfirm']) {
                if (settings['newPwd']===settings['pwdConfirm']) {
                  return true
                }
                else
                this.dataser.error("passwords donot match")
              }else{
                this.dataser.error("enter the confirm password");
              }
            }else{
              if (!settings['pwdConfirm']) {
                return true

              }else{
                this.dataser.error("enter the passoword")
              }
             
            }

          }else{
            this.dataser.error("enter your email");
          }
      }
      else{
        this.dataser.error("enter the name");
      }
  }

    async update(){
      this.btndisabled = true;
      try {
        if (this.validate(this.currentsetting)) {
          const data  = await this.restApi.post(
            'http://localhost:3000/api/accounts/profile',{
              name:this.currentsetting['name'],
              email:this.currentsetting['email'],
              password:this.currentsetting['newPwd'],
              isseller:this.currentsetting['isSeller']
            }
          );
          data['success']
          ? (this.dataser.getProfile(),this.dataser.success(data['message']))
          : (this.dataser.error(data['error']))
        }
      } catch (error) {
          this.dataser.error(error['message']);

      }
      this.btndisabled  = false;
    }
}

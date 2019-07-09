import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  btnDisabled  = false;
  currentAddress:any;

  constructor(private dataser:DataService , private restApi:RestApiService) { }

 async ngOnInit() {
      try {
              const data = await this.restApi.get(
                "http://localhost:3000/api/accounts/address"
              )
              if (
                JSON.stringify(data['address']) === '{}' &&
                this.dataser.message === ''
              ) {
                this.dataser.warning('you have not enter shipping address ,please enter shipping address');
              }
              this.currentAddress  = data['address'];
      } catch (error) {
        this.dataser.error(error)['message'];
      }

  }

  async updateAddress(){
    this.btnDisabled = true;

    try {
      const res= await this.restApi.post(
        'http://localhost:3000/api/accounts/address',this.currentAddress
      );
      
      res['success']
      ? (this.dataser.success(res['message']),await this.dataser.getProfile())
      : this.dataser.error(res['message']);
    } catch (error) {
      this.dataser.error(error['message']);

    }
    this.btnDisabled = false;
  }
 

}

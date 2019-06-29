import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor( private http :HttpClient) { }

getHeader(){
  const token = localStorage.getItem('token');
  return token ? new HttpHeaders().set('authorization',token):null;
}

  get(link:string){
    return this.http.get(link,{headers:this.getHeader()}).toPromise();
  }

  post(link:string, body:any){
    return this.http.post(link,body,{headers:this.getHeader()}).toPromise();
  }
}


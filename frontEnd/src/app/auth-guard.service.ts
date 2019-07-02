import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router' 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if(localStorage.getItem('token')){
      // when the user is login authguard is open profile page and block register page
        return state.url.startsWith('/profile')
        ? true
        : (this.router.navigate(['/']),false);
    }else{
       //else run  when the user is not  login authguard is open register page and block profile page
        return  state.url.startsWith('/profile')
        ?  (this.router.navigate(['/']),false )
        :true;
    }
  }
}

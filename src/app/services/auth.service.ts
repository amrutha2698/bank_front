import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  //isloggedIn
  isLoggedin(){
    return !!localStorage.getItem("token")
  }

}

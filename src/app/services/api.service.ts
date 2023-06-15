import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url="http://localhost:3000"
  constructor(private http:HttpClient) { }
  register(username:any,acno:any,password:any) {
    const body={
      username,
      acno,
      password
    }
    return this.http.post(`${this.base_url}/employee/register`,body)
  }

  //login api
  login(acno:any,password:any){
    const body={
    
      acno,
      password
    }
    //api call
    return this.http.post(`${this.base_url}/employee/login`,body)
  }

  //adding header to http req
  appendToken(){
    //get token from local storage
    const token = localStorage.getItem("token")
    // create http header
    let headers =new HttpHeaders()
    if(token){
      //append token in headers
      headers=headers.append("access-token",token)
      options.headers=headers
    }
    return options
  }
  // balanceEnquiry
  balanceEnquiry(acno:any){
    // make server api call to get balance
   return this.http.get(`${this.base_url}/user/balance/${acno}`,this.appendToken())
  }
  //fund transfer
  fundTransfer(creditAcno:any,creditAmount:any,pswd:any){
    const body={
      creditAcno,
      creditAmount,
      pswd

    }
    //make an api call
    return this.http.post(`${this.base_url}/user/transfer`,body,this.appendToken())
  }
 // for transaction  
getTransactions(){
  return this.http.get(`${this.base_url}/user/ministatement`,this.appendToken())
}
 //delete acno
 deleteAcno(){
  return this.http.delete(`${this.base_url}/user/delete`,this.appendToken())
 }
}

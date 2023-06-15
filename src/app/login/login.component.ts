import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //loading spinner
  isLoading:boolean=false

 //form group/model
loginForm=this.fb.group({
  //form array
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

})
  
constructor(private fb:FormBuilder,private api:ApiService,private toaster:ToasterService,private DashboardRouter:Router){}
login(){
  if(this.loginForm.valid){
    //form valid
   //get inputs
   let acno=this.loginForm.value.acno
   let password=this.loginForm.value.password

   //set isloading to true
   this.isLoading=true

   //login api call in service
   this.api.login(acno,password).subscribe({
    next:(res:any)=>{
      //res destructure to preuser and token
      const {preuser,token} =res

      //store username in local storage
    localStorage.setItem('LoginUser',preuser.username)

      //store acno in local storage
      localStorage.setItem('loginUserAcno',preuser.acno)

      //store token in local storage
      localStorage.setItem("token",token)
      
      setTimeout(()=>{
        //set isloading to true
        this.isLoading=false

        //success notification
        this.toaster.showSuccess(`welcome ${preuser.username}`,'success')
        //redirect to dashboard after 2sec dashboard
        this.DashboardRouter.navigateByUrl('dashboard')
      },2000);
      },
      error:(err:any)=>{
        // console.log(err.error);
        this.toaster.showError(err.error,'Fail')
        
      }
   })
  }
  else{
    // alert("invalid")
    this.toaster.showWarning("Invalid","Warning")
  }
}
}

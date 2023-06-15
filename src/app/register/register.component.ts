import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

//form group/model
registerForm=this.fb.group({
  //form array
  username:['',[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z]*')]],
  account:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

})
constructor(private fb:FormBuilder ,private api:ApiService,private toster:ToasterService,private JoinRouter:Router){

}
register(){
  if(this.registerForm.valid){
    //form valid
   //get inputs
   let username=this.registerForm.value.username
   let account=this.registerForm.value.account
   let password=this.registerForm.value.password

   //register api call in service
   this.api.register(username,account,password).subscribe({
    next:(response:any)=>{
      console.log(response);
      this.toster.showSuccess(`${response.username} register successfully...`,'success')
      setTimeout(() => {
        this.JoinRouter.navigateByUrl('login')
      }, 2000);
      //navigate to login page
      
    },
    error:(err:any)=>{
      // console.log(err);
      this.toster.showError(`${err.error}`,'fail')
    }
   })
  }
  else{
    //form invalid
   this.toster.showWarning("invalid form",'warning')
  }
}
}



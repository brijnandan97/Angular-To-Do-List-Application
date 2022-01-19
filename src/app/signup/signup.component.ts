import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../users.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  gender='Male'
  
  constructor(private router:Router, private userservice:UsersService) {
   }

  ngOnInit(): void {
    
  }
  
  reader!:FileReader;
  selectFiles(event:any){
    if(event.target.files){
      this.reader=new FileReader();
      this.reader.readAsDataURL(event.target.files[0])
    }
  }

  signUp(signupform:NgForm){
    if(this.userservice.users.filter(user => user.email==signupform.value.email)[0]){
      alert("Email already registered");
    }
    else if(signupform.value.password1!=signupform.value.password2){
      alert("Password and confirm Password should match!")
    }
    else{
      this.userservice.addUser(signupform,this.reader);
      alert("Registration Successful");
      console.log(this.userservice.users);
      
      signupform.reset();
      this.router.navigate(['/login']);
    }
    
  }

}

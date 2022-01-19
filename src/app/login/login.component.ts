import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  constructor(private router:Router,private userservice:UsersService) { 
    
  }

  ngOnInit(): void {
  }
  
  LogIn(loginForm:NgForm){
    let user=this.userservice.users.filter(user => user.email==loginForm.value.email && user.password==loginForm.value.password)[0]
    
    if(user){
      alert("You are logged in");
      this.userservice.activeUser(user.id-1);
      this.router.navigate(['/todolist']);
    }
    else if(this.userservice.users.filter(user => user.email==loginForm.value.email && user.password!=loginForm.value.password)[0]){
      alert("Enter correct Password!")
    }
    else{
      alert("Account doesn't exist! Please Signup!");
      this.router.navigate(['/signup']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service'
import { Router } from '@angular/router';
import { ToDo } from '../todolist/ToDo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  users:
  {
        id:number,
        firstname:string,
        lastname:string,
        gender:string,
        phone:string,
        address:string,
        email:string,
        password:string,
        confirmpassword:string,
        uploadedImage:string | ArrayBuffer | null,
        isLogged:boolean,
        todoTasks:ToDo[];
  }
  

  constructor(private userservice:UsersService,private router:Router) {
    this.users=this.userservice.getActiveUser();

   }
   
  ngOnInit(): void {
    console.log(this.userservice.users);
  }

  reader!:FileReader;
  selectFiles(event:any){
    if(event.target.files){
      this.reader=new FileReader();
      this.reader.readAsDataURL(event.target.files[0])
      this.users.uploadedImage=this.reader.result;
    }
  }

  updateDetails(Profileform:NgForm){
    if(Profileform.value.password1!=Profileform.value.password2){
      alert("Password and confirm Password should match!")
    }
    else if(this.userservice.users.filter(user => user.email==Profileform.value.email)[0] && Profileform.value.email!=this.users.email){
      alert("Email already registered");
    }
    else{
      this.users.firstname=Profileform.value.firstname;
      this.users.lastname=Profileform.value.lastname;
      this.users.gender=Profileform.value.gender;
      this.users.phone=Profileform.value.phone;
      this.users.address=Profileform.value.address;
      this.users.email=Profileform.value.email;
      this.users.password=Profileform.value.password1;
      this.users.confirmpassword=Profileform.value.password2;
      alert("Profile Updated Successfully");
    }
    
  }

  Logout(){
    this.userservice.getActiveUser().isLogged=false;
    this.router.navigate(['/login']);
    alert("You have successfully logged out!")
  
  }

}

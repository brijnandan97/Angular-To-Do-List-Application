import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToDo } from './todolist/ToDo';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  users:
  {
        id:number,
        firstname:string,
        lastname:string,
        gender:string,
        address:string,
        email:string,
        password:string,
        confirmpassword:string,
        uploadedImage:string | ArrayBuffer | null,
        isLogged:boolean,
        todoTasks:ToDo[];
  }[]=[];
  
  Activeid!:number;
  

  addUser(signupform:NgForm,reader:FileReader){
    let user={
      id:this.users.length+1,
      firstname:signupform.value.firstname,
      lastname:signupform.value.lastname,
      gender:signupform.value.gender,
      address:signupform.value.address,
      email:signupform.value.email,
      password:signupform.value.password1,
      confirmpassword:signupform.value.password2,
      uploadedImage:reader.result,
      isLogged:false,
      todoTasks:[]
    }
    this.users.push(user);
  }

  activeUser(id:number){
      this.Activeid=id;
      this.users[id].isLogged=true;
  }

  getActiveUser(){
    return this.users[this.Activeid];
  }

  

  constructor() { }

}

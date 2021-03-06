import { Component, OnInit } from '@angular/core';
import { ToDo } from './ToDo';
import {UsersService} from '../users.service'
import { Router } from '@angular/router';
import {LocationStrategy} from'@angular/common';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  
  searchTerm!:string;

  todos!:ToDo[];
  newTodo!:string;
  Duedate!:string;
  Reminderdate!:string;
  isShown=true;
  updateId!:number;
  Office!:boolean;
  Assignment!:boolean;
  Household!:boolean;
  Etcetra!:boolean;

  constructor(private userservice:UsersService,private router:Router,private Location: LocationStrategy) {
    history.pushState(null, '', window.location.href);
    this.Location.onPopState(() => {
      history.pushState(null, '', window.location.href);
    });
   }

  ngOnInit(): void {
    this.todos=this.userservice.getActiveUser().todoTasks;
  }
  
  saveTodo(){
    
    if(this.newTodo && this.Duedate && this.Reminderdate && (new Date(this.Duedate)>=new Date(this.Reminderdate)) && 
    (this.Office || this.Assignment || this.Household || this.Etcetra  )){
      let todo=new ToDo();
      todo.name=this.newTodo;
      todo.isCompleted=false;
      todo.Duedate=this.Duedate;
      todo.Reminderdate=this.Reminderdate;
      if(this.Office){
        todo.categories.push("Office");
      }
      if(this.Assignment){
        todo.categories.push("Assignment");
      }
      if(this.Household){
        todo.categories.push("Household");
      }
      if(this.Etcetra){
        todo.categories.push("Etcetra");
      }
      this.todos.push(todo);
      this.newTodo='';
      this.Duedate='';
      this.Reminderdate='';
      this.Office=false;
      this.Assignment=false;
      this.Household=false;
      this.Etcetra=false;
      
    }
    else if(this.newTodo===undefined || this.newTodo===null || this.newTodo===''){
      alert('Please Enter To do');
    }
    else if(this.Duedate===undefined || this.Duedate===null){
      alert('Please enter Due Date');
    }
    else if(this.Reminderdate===undefined || this.Reminderdate===null){
      alert("Please enter Reminder Date");
    }
    else if(new Date(this.Duedate)<new Date(this.Reminderdate)){
      alert("Reminder Date should be less than Due Date");
    }
    else if(!this.Office && !this.Assignment && !this.Household && !this.Etcetra){
      alert("Please select any category");
    }
    
  }


  done(id:number){
    this.todos[id].isCompleted=true;
  }

  remove(id:number){
    if(confirm("Are you sure you want to delete this item:")){ 
      this.todos.splice(id,1);
      this.isShown=true;
      this.newTodo='';
      this.Duedate='';
      this.Reminderdate='';
      this.Office=false;
      this.Assignment=false;
      this.Household=false;
      this.Etcetra=false;
      
    }
  }
  removeAll(){
    if(this.todos.length>0){
      if(confirm("Are you sure you want to delete all the items:")){ 
        this.todos.length=0;
        this.isShown=true;
        this.newTodo='';
        this.Duedate='';
        this.Reminderdate='';
        this.Office=false;
        this.Assignment=false;
        this.Household=false;
        this.Etcetra=false;

      }
    }
  }

  Logout(){
    this.userservice.getActiveUser().isLogged=false;
    this.router.navigate(['/login']);
    alert("You have successfully logged out!")
    
  }

  SortTask(){
    this.todos.sort(function(a,b): any{
      return Date.parse(a.Duedate) - Date.parse(b.Duedate);
    });
  }

  edit(id:number){
    this.newTodo='';
    this.Duedate='';
    this.Reminderdate='';
    this.Office=false;
    this.Assignment=false;
    this.Household=false;
    this.Etcetra=false;

    
    this.newTodo=this.todos[id].name;
    this.Duedate=this.todos[id].Duedate;
    this.Reminderdate=this.todos[id].Reminderdate;
    for(let val of this.todos[id].categories){
      if(val==='Office'){
        this.Office=true;
      }
      if(val==='Assignment'){
        this.Assignment=true;
      }
      if(val==='Household'){
        this.Household=true;
      }
      if(val==='Etcetra'){
        this.Etcetra=true;
      }
    }

    this.updateId=id;
    this.isShown=false;
  }

  updateTask(){
    
    if(this.newTodo && this.Duedate && this.Reminderdate && (new Date(this.Duedate)>=new Date(this.Reminderdate)) && 
    (this.Office || this.Assignment || this.Household || this.Etcetra  )){
      this.todos[this.updateId].name=this.newTodo;
      this.todos[this.updateId].Duedate=this.Duedate;
      this.todos[this.updateId].Reminderdate=this.Reminderdate;
      this.todos[this.updateId].categories=[];
      if(this.Office){
        this.todos[this.updateId].categories.push("Office");
      }
      if(this.Assignment){
        this.todos[this.updateId].categories.push("Assignment");
      }
      if(this.Household){
        this.todos[this.updateId].categories.push("Household");
      }
      if(this.Etcetra){
        this.todos[this.updateId].categories.push("Etcetra");
      }
      this.newTodo='';
      this.Duedate=''
      this.Reminderdate='';
      this.Office=false;
      this.Assignment=false;
      this.Household=false;
      this.Etcetra=false;
      this.isShown=true;

      
    }
    else if(this.newTodo===undefined || this.newTodo===null || this.newTodo===''){
      alert('Please Enter To do');
    }
    else if(this.Duedate===undefined || this.Duedate===null){
      alert('Please enter Due Date');
    }
    else if(this.Reminderdate===undefined || this.Reminderdate===null){
      alert("Please enter Reminder Date");
    }
    else if(new Date(this.Duedate)<new Date(this.Reminderdate)){
      alert("Reminder Date should be less than Due Date");
    }
    else if(!this.Office && !this.Assignment && !this.Household && !this.Etcetra){
      alert("Please select any category");
    }
  }
  
  ViewProfile(){
    this.router.navigate(['/profile']);
  }

}
import { PipeTransform, Pipe } from '@angular/core';
import { ToDo } from './ToDo';
import {UsersService} from '../users.service';

@Pipe({
    name:'todoFilter'
})

export class todoFilterPipe implements PipeTransform{
    
    constructor(private userservice:UsersService){}
    
    transform(todos:ToDo[],searchTerm:string):ToDo[]{
        if(!todos || !searchTerm){
            return todos;
        }
        // return todos.filter(todo=>
        //     todo.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 
        //     || todo.categories[0].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1
        //     );
        

        return todos.filter(todo=>{
            if(todo.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1){
                return todo.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1;
            }
            else if(todo.categories.length==1){ 
                return todo.categories[0].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1;
            }
            else if(todo.categories.length==2){
                return todo.categories[0].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 
                ||todo.categories[1].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1;
            }
            else if(todo.categories.length==3){
                return todo.categories[0].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 
                ||todo.categories[1].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1
                ||todo.categories[2].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1;
            }
            else if(todo.categories.length==4){
                return todo.categories[0].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 
                ||todo.categories[1].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1
                ||todo.categories[2].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1
                ||todo.categories[3].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1;
            }
            return -1;
        });

    }
}
import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpService} from './services/http.service';
import {User} from './model/user';
import {Observable} from 'rxjs/Rx';

@Component({
    selector:'register-form',
    templateUrl:'./register-form.component.html',
    providers:[HttpService]
})
export class RegisterComponent{

    constructor(
        private httpservice : HttpService
    ){}

    private user = new User("", "", "","");

   
    submitUser(){
         let userOperation:Observable<User>;
        console.log(this.user)
       userOperation = this.httpservice.addUser(this.user);
        userOperation.subscribe(
            users=>{console.log("addeduser"+JSON.stringify(users))},
            err=>{console.log(err)}
        );
    }

   
}
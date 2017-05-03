import {Component} from '@angular/core';
import {HttpService} from './services/http.service';
import {User} from './model/user';
import {Observable} from 'rxjs/Rx';

@Component({
    selector:'header',
    templateUrl:'./header.component.html'
    
})
export class HeaderComponent{

    constructor(
        private httpservice:HttpService
    ){}

    private user = new User("", "", "","");

    login(){
        let userOperation:Observable<User>;
          console.log(this.user)
       userOperation = this.httpservice.login(this.user);
        userOperation.subscribe(
            users=>{console.log("addeduser"+JSON.stringify(users))},
            err=>{console.log(err)}
        );
    }

}
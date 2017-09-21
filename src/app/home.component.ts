import {Component} from '@angular/core';
import{User} from './model/user';
import{PostFormComponent} from './post-form.component'

@Component({
    selector:'home',
    templateUrl:'./home.component.html'
})
export class HomeComponent{
    currentUser: User;
    constructor(
        
    ){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.currentUser)
    }


}
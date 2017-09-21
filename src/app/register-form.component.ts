import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { User } from './model/user';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
    providers: [HttpService]
})
export class RegisterComponent {
    success:boolean
    repassword:string
    constructor(
        private httpservice: HttpService
    ) { }

    private user = new User(0, "", "", "", "", "");


    submitUser() {
        let userOperation: Observable<User>;
        console.log(this.user)
        userOperation = this.httpservice.addUser(this.user);

        userOperation.subscribe(
            users => { this.user = new User(0,"","","","","");
            this.repassword="";
            this.success = true;
            console.log("addeduser" + JSON.stringify(users)) },
            err => { console.log(err) }
        );
    }


}
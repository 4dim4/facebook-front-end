import {Component,OnInit} from '@angular/core';
import {HttpService} from './services/http.service';
import {User} from './model/user';
import {Observable} from 'rxjs/Rx';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector:'header',
    templateUrl:'./header.component.html'
    
})
export class HeaderComponent implements OnInit{

    returnUrl:string;
    
    private currentUser:User;
    constructor(
        private httpservice:HttpService,
        private route: ActivatedRoute,
        private router:Router
    ){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("**Hit Header**")
        httpservice.getLoggedinUser.subscribe( (response:User) => this.currentUser = response);
    }

    ngOnInit(){
        // console.log(this.route.snapshot.queryParams['returnUrl'])
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    private user = new User(0,"","", "", "","");
    private username = "";
    private password = "";
    private errormsg:String;

    login(){
        this.errormsg="";
        this.httpservice.login(this.username,this.password)
        .subscribe(
            users=>{
                 console.log("logged in"+JSON.stringify(users))
            this.router.navigate(['/home']);
        },
            err=>{
                console.log(err)
                if(err===401){
                    this.errormsg = "Invalid Credentials";
                    console.log(this.errormsg)
                }
            }
        );
    }


    logout(){
        this.httpservice.logout()
        this.router.navigate(['/register']);   
            
    }

}
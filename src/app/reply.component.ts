import {Component,OnInit,Input} from '@angular/core';
import {HttpService} from './services/http.service';
import {Reply} from './model/reply';

import {Observable} from 'rxjs/Rx';

@Component({
    selector:'reply',
    templateUrl:'./reply.component.html',
    
})
export class ReplyComponent implements OnInit{ 
   @Input() reply:Reply
   firstName:string
    constructor(
        private httpservice:HttpService
    ){}


    ngOnInit(){

        this.getFirstName()

       
    }

    
    
    getFirstName(){
        this.httpservice.getUser(this.reply.userId)
        .subscribe(
            res=>{
                this.firstName = res.firstName
            },
            err=>console.log(err)
        )
    }
    
    
   
}
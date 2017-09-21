import {Component,OnInit,Input} from '@angular/core';
import {HttpService} from './services/http.service';
import {Post} from './model/post';
import {Observable} from 'rxjs/Rx';

@Component({
    selector:'post-list',
    templateUrl:'./post-list.component.html',
    
})
export class PostListComponent implements OnInit{ 
   @Input() posts:Post[]
   firstName:string
   like:string
    constructor(
        private httpservice:HttpService
    ){}


    ngOnInit(){
        this.loadPosts()
        this.loadFirstName()
        this.like = "Like"
   
    }

    loadPosts(){

        this.httpservice.getAllUserPosts(JSON.parse(localStorage.getItem('currentUser')).id)
                .subscribe(
                    res => {
                        this.posts = res
                        // this.posts.forEach(function(entry){
                        //     console.log(entry.userId)
                        // })
                        },
                    err=> {
                        console.log(err)
                    }
                )
    }

    loadFirstName(){
        this.firstName = JSON.parse(localStorage.getItem('currentUser')).firstName;
   
    }

    toggleLike(){
        if(this.like==="Like"){
            this.like = "Unlike";
        }
        else
        this.like="Like";
    }
    
    
   
}
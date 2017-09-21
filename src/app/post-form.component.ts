import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { Post } from './model/post';
import { Observable } from 'rxjs/Rx';
import { PostComponent } from './post.component';
import { PostListComponent } from './post-list.component';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
@Component({
    selector: 'post-form',
    templateUrl: './post-form.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]

})
export class PostFormComponent implements OnInit {
    posts: Post[]
    isFilled: boolean
    state:string
    constructor(
        private httpservice: HttpService
    ) { }

    private post = new Post(0, "", 0,"");

    ngOnInit() {
        this.loadPosts()
        this.isFilled = false
        this.state="in"
    }

    submitPost() {

        let postOperation: Observable<Post>;
        let userId = JSON.parse(localStorage.getItem('currentUser')).id;
        this.post.userId = userId;
        this.post.state="in"
     
        postOperation = this.httpservice.addPost(this.post);

        postOperation.subscribe(
            res => {
            
                this.post.description = "";
                this.httpservice.getAllPosts()
                    .subscribe(
                    res => this.posts = res,
                    err => {
                        console.log(err)
                    }
                    )
            },
            err => console.log(err)
        )
    }

    loadPosts() {

        this.httpservice.getAllPosts()
            .subscribe(
            res => {
                this.posts = res
                // this.posts.forEach(function (entry) {
                //     console.log("userId" + entry.userId)
                // })
            },
            err => {
                console.log(err)
            }
            )
    }

    // changeFilled(){
    //     if(this.post.description!=""){
    //         this.isFilled=true;
    //     }
    //     else{
    //         this.isFilled=false;
    //     }
    // }
}
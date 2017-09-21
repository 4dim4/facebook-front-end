import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from './services/http.service';
import { Post } from './model/post';
import { Like } from './model/like';
import { Comment } from './model/comment';
import { Observable } from 'rxjs/Rx';
import { CommentComponent } from './comment.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/core';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
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
export class PostComponent implements OnInit {
    @Input() post: Post

    comments: Comment[]
    likes:Like[]
    firstName: string
    isLike: boolean
    clickedComment: boolean
    private like = new Like(0, 0, 0);
    private comment = new Comment(0, "", 0, 0);
    constructor(
        private httpservice: HttpService
    ) { }


    ngOnInit() {

        this.loadFirstName()
        this.like.postId = this.post.id
        this.like.userId = this.post.userId
        this.checkLike()
        this.clickedComment = false;
        this.getComments()
      this.getLikes()

    }

    toggleLike() {

        if (this.isLike === false) {

            this.httpservice.likePost(this.like)
                .subscribe(
                res => {
                    this.checkLike()
                },
                err => {
                    console.log(err)
                }
                )

        }
        else
            this.httpservice.unLikePost(this.like.id)
                .subscribe(
                res => {
                    this.checkLike()
                },
                err => {
                    console.log(err)
                }
                )

    }

    loadFirstName() {
   
        this.httpservice.getUser(this.post.userId)
            .subscribe(
                res=>{
                    this.firstName = res.firstName
                }
            )
       
    
    }

    checkLike() {

        this.httpservice.checkLike(this.like.userId, this.like.postId)
            .subscribe(
            res => {

                if (res) {
                    this.like.id = res;
                  
                    this.isLike = true
                }
                else {
                    this.isLike = false
                }

            },
            err => {
                console.log(err)
            }
            )

    }

    toggleComment() {

        if (this.clickedComment === false) {
            this.clickedComment = true;
        }

    }

    getComments() {
        this.httpservice.getAllPostComments(this.post.id)
            .subscribe(
            res => {
                this.comments = res;
            },
            err => console.log(err)
            )
    }

    addComment() {
        this.comment.postId = this.post.id
        this.comment.userId = JSON.parse(localStorage.getItem('currentUser')).id;

        this.httpservice.addComment(this.comment)
            .subscribe(
            res => {
                this.comment.body = "";
                this.getComments()
            },
            err => console.log(err)

            )

    }

    getLikes(){
        
        this.httpservice.getLikes(this.post.id)
            .subscribe(
                res=>{
                   
                  console.log(res)
                }
            )
    }

}
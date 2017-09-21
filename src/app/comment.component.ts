import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from './services/http.service';
import { Comment } from './model/comment';
import { Reply } from './model/reply';
import { CommentLike } from './model/comment_like';
import { Observable } from 'rxjs/Rx';
import { ReplyComponent } from './reply.component';

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',

})
export class CommentComponent implements OnInit {
    @Input() comment: Comment
    firstName: string
    clickedReply: boolean
    isLike: boolean
    hasReplies: string
    replies: Reply[]
    private commentLike = new CommentLike(0, 0, 0);
    private reply = new Reply(0, "", 0, 0);
    constructor(
        private httpservice: HttpService
    ) { }


    ngOnInit() {
        this.clickedReply = false
        this.getFirstName()

        this.commentLike.commentId = this.comment.id;
        this.commentLike.userId = this.comment.userId;


        this.checkLike()
        console.log(this.commentLike)
        this.hasReplies = "none"
        this.getReplies()
        console.log("this.replies" + this.replies)
    }

    getFirstName() {
        this.httpservice.getUser(this.comment.userId)
            .subscribe(
            res => {
                this.firstName = res.firstName
            },
            err => console.log(err)
            )
    }

    toggleReply() {

        if (this.clickedReply === false) {
            this.clickedReply = true
        }

    }

    toggleLike() {
        console.log(this.isLike)
        if (this.isLike === false) {

            this.httpservice.likeComment(this.commentLike)
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
            this.httpservice.unLikeComment(this.commentLike.id)
                .subscribe(
                res => {
                    this.checkLike()
                },
                err => {
                    console.log(err)
                }
                )
    }

    checkLike() {
        console.log("check")
        this.httpservice.checkCommentLike(this.commentLike.userId, this.commentLike.commentId)
            .subscribe(
            res => {

                if (res) {
                    this.commentLike.id = res;
                    console.log(this.commentLike)
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

    getReplies() {

        this.httpservice.getAllCommentReplies(this.comment.id)
            .subscribe(
            res => {
                this.replies = res;
                console.log(this.replies[0])
                if (this.replies[0]) {
                    this.hasReplies = "block";
                    console.log("Response: " + res)

                }
            },
            err => console.log(err)
            )

    }

    addReply() {
        console.log("check")
        this.reply.commentId = this.comment.id;
        this.reply.userId = JSON.parse(localStorage.getItem('currentUser')).id;
        this.httpservice.addReply(this.reply)
            .subscribe(
            res => {
                this.reply.body = "";
                this.getReplies();
            },
            err => console.log(err)
            )

    }







}
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../model/user'
import { Post } from '../model/post'
import { Like } from '../model/like'
import { Comment } from '../model/comment'
import { Reply } from '../model/reply'
import { CommentLike } from '../model/comment_like'
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
    @Output() getLoggedinUser: EventEmitter<any> = new EventEmitter();

    constructor(private http: Http) { }
    private currentUser = new User(0, "", "", "", "", "");
   
    private url = 'http://localhost:2000/user/';

    public addUser(body: Object): Observable<User> {
        
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
    
    
        return this.http.post(`${this.url}`, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public login(username: string, password: string) {

 
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.url}` + `login`, JSON.stringify({ username: username, password: password }), options)
            .map((res: Response) => {
                let user = res.json();

           
                if (user) {
                    this.currentUser.id = user.id;
                    this.currentUser.firstName = user.first_name;
                    this.currentUser.lastName = user.last_name;
                    this.currentUser.email = user.email;
                    this.currentUser.userName = user.user_name;
                    this.currentUser.password = user.password;
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    this.getLoggedinUser.emit(this.currentUser);
                }
            })
            .catch((error: any) => Observable.throw(error.status || 'Server error'));
    }

    public logout() {
        localStorage.removeItem('currentUser');
        this.getLoggedinUser.emit(null);
     
    }


    public addPost(body: Object): Observable<Post> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.url}` + `post`, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllUserPosts(id: number): Observable<Post[]> {
        return this.http.get(this.url + 'post/' + id)
            .map(
            (res: Response) => {
                let posts: Post[] = res.json().posts
                let x: any
                for (x = 0; x < posts.length; x++) {
                    posts[x].userId = res.json().posts[x].user_id
                  
                }

                return posts
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllPosts(): Observable<Post[]> {
        return this.http.get(this.url + 'post')
            .map(
            (res: Response) => {
                let posts: Post[] = res.json().posts
                let x: any
                for (x = 0; x < posts.length; x++) {
                    posts[x].userId = res.json().posts[x].user_id
                 
                }

                return posts
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public likePost(body: Object): Observable<Like> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.url}` + `post/like`, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public unLikePost(id: number): Observable<Like> {

        return this.http.delete(`${this.url}` + `post/like/` + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public checkLike(userId: number, postId: number) {

        return this.http.get(this.url + 'post/like/' + userId + '/' + postId)
            .map(
            (res: Response) => {
                if (res.json().like) {
                    return res.json().like.id
                }
                return null;
            }
            )
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }
    public getLikes(postId:number):Observable<string[]> {

        return this.http.get(this.url + 'post/like/'+postId)
            .map(
            (res: Response) => {
                  let likes: Like[] = res.json().likes
                  let firstNames:string[] =[];
                let x: any
                if(likes!=null){
                for (x = 0; x < likes.length; x++) {
                   console.log("userId :"+res.json().likes[x].user_id)
                     this.getUser(res.json().likes[x].user_id).subscribe(
                         res=> {console.log(res.firstName),firstNames.push(res.firstName)},
                         err=>console.log(err)
                     )
                  
                }
            }
           

                return firstNames
            }
            )
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    public getAllPostComments(id: number): Observable<Comment[]> {
        return this.http.get(this.url + 'post/comment/' + id)
            .map(
            (res: Response) => {
                let comments: Comment[] = res.json().comments
                let x: any
                for (x = 0; x < comments.length; x++) {
                    comments[x].userId = res.json().comments[x].user_id
                    comments[x].postId = res.json().comments[x].post_id
              
                }

                return comments
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public addComment(body: Object): Observable<Comment> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.url}` + `post/comment`, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

      public getUser(id: number): Observable<User> {
        return this.http.get(this.url + id)
            .map(
            (res: Response) => {
                let user: User = res.json()
                
                user.firstName = res.json().first_name;
                user.lastName = res.json().last_name;
                user.userName = res.json().user_name;
             
                

                return user
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    public likeComment(body: Object): Observable<CommentLike> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.url}` + `post/comment/like`, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public unLikeComment(id: number): Observable<CommentLike> {

        return this.http.delete(`${this.url}` + `post/comment/like/` + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


      public checkCommentLike(userId: number, commentId: number) {

        return this.http.get(this.url + 'post/comment/like/' + userId + '/' + commentId)
            .map(
            (res: Response) => {
                if (res.json().like) {
             
                    return res.json().like.id
                }
                return null;
            }
            )
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    public getAllCommentReplies(id: number): Observable<Reply[]> {
        return this.http.get(this.url + 'post/comment/reply/' + id)
            .map(
            (res: Response) => {
                let replies: Reply[] = res.json().replies
                let x: any
                for (x = 0; x < replies.length; x++) {
                    replies[x].userId = res.json().replies[x].user_id
                    replies[x].commentId = res.json().replies[x].comment_id
                
                }

                return replies
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

     public addReply(body: Object): Observable<Reply> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.url}` + `post/comment/reply`, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
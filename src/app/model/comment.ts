export class Comment {
    constructor(
        public id:number,
        public body:string,
        public postId:number,
        public userId:number
        ){}
}
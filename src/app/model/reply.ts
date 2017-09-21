export class Reply {
    constructor(
        public id:number,
        public body:string,
        public commentId:number,
        public userId:number
        ){}
}
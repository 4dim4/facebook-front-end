import {Injectable} from '@angular/core';
import{ Http , Response ,Headers , RequestOptions} from '@angular/http';
import{User} from '../model/user'
import{Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService{

    constructor(private http:Http){}

    private url='http://localhost:2000/user';

    public addUser(body:Object):Observable<User>{
        console.log("service"+body)
        let bodyString = JSON.stringify(body);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
console.log("service"+bodyString)
console.log(this.url)
        return this.http.post(`${this.url}`,bodyString,options)
                        .map((res:Response)=>res.json())
                        .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
    }

    public login(body:Object):Observable<User>{
        
    }
}
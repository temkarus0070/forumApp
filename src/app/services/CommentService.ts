import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BACKEND_URL} from "../app.module";
import {Comment} from "../models/comment";

@Injectable({
  providedIn:"root"
})
export class CommentService{
  constructor(private httpService:HttpClient) {
  }

  load():Observable<Array<Comment>>{
    return this.httpService.get<Array<Comment>>(BACKEND_URL+"/comment");
  }

  delete(commentId:number){
    let httpHeaders:HttpHeaders=new HttpHeaders();
    httpHeaders.set("commentId",String(commentId));
    this.httpService.delete(BACKEND_URL+"/comment",{headers:httpHeaders,params:{'commentId':commentId}}).subscribe(e=>{

    },
      error => {console.log(error)})
  }

  create(comment:Comment){
    this.httpService.post(BACKEND_URL+"/comment",comment).subscribe(e=>{},
      error => console.log(error));
  }
}

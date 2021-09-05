import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BACKEND_URL} from "../app.module";
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient) { }

  load():Observable<Array<Post>>{

    return this.httpClient.get<Array<Post>>(BACKEND_URL+"/posts");

  }

  create(post:Post){
    console.log(post);
    let httpHeaders:HttpHeaders=new HttpHeaders();
    httpHeaders.set("Content-Type","application/json");
    this.httpClient.post(BACKEND_URL+"/posts/new",JSON.stringify(post),{  headers:httpHeaders}).subscribe(e=>{},error => {
      console.log(error);
    })
  }
}

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BACKEND_URL} from "../app.module";
import {stringify} from "@angular/compiler/src/util";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient,private router:Router) { }

  load():Observable<Array<Post>>{

    return this.httpClient.get<Array<Post>>(BACKEND_URL+"/post");

  }

  loadBySection(id:number):Observable<Array<Post>>{
    return this.httpClient.get<Array<Post>>(BACKEND_URL+"/post/getPostsBySection",{params:{sectionId:id}});
  }


  loadByHeader(postHeader:string):Observable<Array<Post>>{
    if(postHeader!=null)
      return this.httpClient.get<Array<Post>>(BACKEND_URL+"/post/findPostsByHeader",{params:{header:postHeader}});
    return new Observable<Array<Post>>();
  }

  create(post:Post){
    let httpHeaders:HttpHeaders=new HttpHeaders();
    httpHeaders.set("Content-Type","application/json");
    this.httpClient.post(BACKEND_URL+"/post",JSON.stringify(post),{  headers:httpHeaders}).subscribe(e=>{
      this.router.navigateByUrl(`/sections/${post.section?.id}`);
    },error => {
      console.log(error);
    })
  }

  update(post:Post){
    let httpHeaders:HttpHeaders=new HttpHeaders();
    httpHeaders.set("Content-Type","application/json");
    this.httpClient.put(BACKEND_URL+"/post",JSON.stringify(post),{  headers:httpHeaders}).subscribe(e=>{
      this.router.navigateByUrl(`/sections/${post.section?.id}`);
    },error => {
      console.log(error);
    })
  }

  get(id:number):Observable<Post>{
    return  this.httpClient.get<Post>(BACKEND_URL+"/post/"+id);
  }

  remove(id:number):Observable<any>{
    return this.httpClient.delete(BACKEND_URL+"/post",{params:{postId:id}});
  }


}

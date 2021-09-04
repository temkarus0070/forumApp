import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {post} from "../models/post";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient) { }

  load():Observable<Array<post>>{
    return this.httpClient.get<Array<post>>("http://localhost:8080/posts");

  }
}

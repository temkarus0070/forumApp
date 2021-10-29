import {publish} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BACKEND_URL} from "../app.module";

@Injectable({providedIn:"root"})
export class StatsService {
  constructor(private httpClient:HttpClient) {
  }

  getPostsCountByUser(username:string):Observable<number>{
    return this.httpClient.get<number>(BACKEND_URL+"/stats/postsCountByUser",{params:{username:username}});
  }

  getPostsCountBySection(sectionId:number):Observable<number>{
    return this.httpClient.get<number>(BACKEND_URL+"/stats/postsCountBySection",{params:{sectionId:sectionId}});
  }
}

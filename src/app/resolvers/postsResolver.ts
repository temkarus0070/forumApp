import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post} from "../models/post";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PostService} from "../services/post.service";

@Injectable({
  providedIn:"root"
})
export class PostsResolver implements Resolve<Array<Post>>{
  constructor(private postsService:PostService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Post>> | Promise<Array<Post>> | Array<Post> {
    console.log("work")
    return this.postsService.loadBySection(Number(route.paramMap.get("id")));
  }

}

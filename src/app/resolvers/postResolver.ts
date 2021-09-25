import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post} from "../models/post";
import {PostService} from "../services/post.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:"root"
})
export class PostResolver implements Resolve<Post>{
  constructor(private postService:PostService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> | Promise<Post> | Post {
    return this.postService.get(Number(route.paramMap.get("id")));
  }

}

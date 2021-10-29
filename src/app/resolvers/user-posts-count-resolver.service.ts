import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {StatsService} from "../services/stats.service";

@Injectable({providedIn:"root"})
export class UserPostsCountResolver implements Resolve<number>{
  constructor(private statsService:StatsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Promise<number> | number {
    return this.statsService.getPostsCountByUser(route.params.username);
  }

}

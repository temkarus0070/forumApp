import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {StatsService} from "../services/stats.service";

@Injectable({
  providedIn: 'root'
})
export class CountBySectionResolver implements Resolve<number> {
  constructor(private statsService:StatsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {
    return this.statsService.getPostsCountBySection(Number(route.paramMap.get("id")));
  }
}

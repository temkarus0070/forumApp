import {Section} from "../models/Section";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {SectionService} from "../services/sectionService";

@Injectable({
  providedIn:"root"
})
export class SectionsResolver implements Resolve<Array<Section>>{
  constructor(private sectionService:SectionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Section>> | Promise<Array<Section>> | Array<Section> {
    return this.sectionService.load();
  }

}

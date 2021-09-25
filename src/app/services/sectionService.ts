import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Section} from "../models/Section";
import {BACKEND_URL} from "../app.module";

@Injectable({
  providedIn:"root"
})
export class SectionService{
  constructor(private httpClient:HttpClient) {
  }

  load():Observable<Array<Section>>{
    return  this.httpClient.get<Array<Section>>(BACKEND_URL+"/section");
  }

  create(section:Section):Observable<any> {
    return this.httpClient.post(BACKEND_URL + "/section", section);
  }

  delete(sectionId:number):Observable<any>{
    return  this.httpClient.delete(BACKEND_URL+"/section",{params:{sectionId:sectionId}})
  }
}

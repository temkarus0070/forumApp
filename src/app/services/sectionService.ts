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
    return  this.httpClient.get<Array<Section>>(BACKEND_URL+"/sections");
  }

  create(section:Section){
    this.httpClient.post(BACKEND_URL+"/sections/new",section).subscribe(
      next=>{},
      error => {
        console.log(error);
      }
    );
  }

  delete(section:Section){
    this.httpClient.delete(BACKEND_URL+"/sections",{params:{sectionId:section.id}})
      .subscribe(e=>{},
        error => {
        console.log(error);
        });
  }
}

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn:"root"
})
export class LocalStorageService {


  public add(...pairs:[string,string][]):Observable<string>{
    let token:string ="";
    pairs.forEach(e=>{
      localStorage.setItem(e[0],e[1]);
      if(e[0]==="token"){
        token=e[1];
      }
    })
    return new Observable<string>(subscriber =>
    {
      subscriber.next(token);
    })
  }

  public get(key:string):Observable<string|null>{
    return new Observable<string|null>(subscriber => {
      subscriber.next(localStorage.getItem(key))
    });
  }
  public getKey(key:string):string|null{
    return localStorage.getItem(key);
  }

  public remove(...keys:string[]):Observable<boolean>{
    return new Observable(subscriber => {
      keys.forEach(e=>localStorage.removeItem(e));
      subscriber.next(true);

    })
  }

  public hasKey(key:string):boolean{
    return localStorage.getItem(key) !== null;
  }
}

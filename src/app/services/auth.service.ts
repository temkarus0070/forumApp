import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login:string="";
  constructor(private httpClient:HttpClient,private route:Router) { }

  auth(username:string,password:string):void{
    var token:string=this.createAuthToken(username,password);
  let headers:HttpHeaders=new HttpHeaders({Authorization:token})
   this.httpClient.get("http://localhost:8080/",{headers,responseType:'text' as 'json'}).subscribe(e=> {
     this.login = username;
     this.registerToken(token);
     this.route.navigateByUrl("/")
   }
  );
  }

  createAuthToken(username:string,password:string):string{
    return 'Basic '+window.btoa(username+":"+password);
  }

  registerToken(token:string){
    sessionStorage.setItem("user",this.login);
    sessionStorage.setItem("token",token);
  }

  logout(){
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    this.login="";
  }

  isAuth(){
    return !sessionStorage.getItem("user")==null;
  }

  getUsername():string{
    return this.login;
  }

  getToken():string{
    return <string>sessionStorage.getItem("token");
  }
}

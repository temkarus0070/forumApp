import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {BACKEND_URL} from "../app.module";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  ngOnInit(): void {

  }




  private login:string="";
  private  token:string="";
  constructor(private httpClient:HttpClient,private route:Router,private localStorageService:LocalStorageService) {
    this.login=this.localStorageService.getKey("user")+"";
    this.token=this.localStorageService.getKey("token")+"";
  }

  authErrorHandler:EventEmitter<string>=new EventEmitter<string>();



  auth(username:string,password:string):void{
    const token: string = this.createAuthToken(username, password);
    let headers:HttpHeaders=new HttpHeaders({Authorization:token})

   this.httpClient.get(BACKEND_URL+"/posts",{headers,responseType:'text' as 'json'}).subscribe(e=> {
       this.registerAuthData(token,username);
   },
     error => {
       this.authErrorHandler.emit("login error")
     }
  );
  }

  createAuthToken(username:string,password:string):string{
    return 'Basic '+window.btoa(username+":"+password);
  }

  registerAuthData(token:string,username:string){
    this.token=token;
    this.login=username;
    this.localStorageService.add(["user",this.login],["token",this.token]).subscribe(
      e=>this.route.navigate(["/"])

    );

  }

  register(username:string,password:string){
    this.httpClient.post(BACKEND_URL+"/register",{username:username,password:password})
      .subscribe(e=>{
        this.auth(username,password);
        },
        error=>{
        this.authErrorHandler.emit("register error");
        })
  }

  logout(){
    this.localStorageService.remove("user","token").subscribe(e=> {
      this.login = ""
    this.token="";
      this.route.navigateByUrl("/login");
    });
  }

  isAuth(){
    return this.localStorageService.hasKey("token");
  }



  getUsername():string{
    return this.login;
  }

  getToken():string{
   return this.token;
  }

}

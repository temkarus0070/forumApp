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
  private role:string="";
  constructor(private httpClient:HttpClient,private route:Router,private localStorageService:LocalStorageService) {
    this.login=this.localStorageService.getKey("user")+"";
    this.token=this.localStorageService.getKey("token")+"";
    this.role=this.localStorageService.getKey("role")+"";
  }

  authErrorHandler:EventEmitter<string>=new EventEmitter<string>();



  auth(username:string,password:string):void{
    const token: string = this.createAuthToken(username, password);
    let headers:HttpHeaders=new HttpHeaders({Authorization:token})

   this.httpClient.get<string>(BACKEND_URL+"/role",{headers,responseType:'text' as 'json'}).subscribe(e=> {
       this.registerAuthData(token,username,e);
   },
     error => {
       this.authErrorHandler.emit("login error")
     }
  );
  }

  createAuthToken(username:string,password:string):string{
    return 'Basic '+window.btoa(username+":"+password);
  }

  registerAuthData(token:string,username:string,role:string){
    this.token=token;
    this.login=username;
    this.role = role;
    this.localStorageService.add(["user",this.login],["token",this.token],["role",this.role]).subscribe(
      e=>this.route.navigate(["/"])

    );

  }

  hasAdminRole():boolean{
    return this.localStorageService.getKey("role")==="admin";
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

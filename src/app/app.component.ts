import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "./services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isAuthorized:boolean=false;
  public userName:string="";

  constructor(private authService:AuthService,private router:Router,private localStorageService:LocalStorageService) {
    this.router.events.subscribe(e=>{
      this.isAuthorized=this.authService.isAuth();
      if(this.isAuthorized){
        localStorageService.get("user").subscribe(e=>
        this.userName=String(e));
      }
    })
  }

  logout(){
this.authService.logout();
  }

  isAdmin():boolean{
    return this.authService.hasAdminRole();
  }

  isHomePage():boolean{
    return this.router.url=="/";
  }

  title = 'forumApp';
}

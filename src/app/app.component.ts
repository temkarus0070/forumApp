import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isAuthorized:boolean=false;

  constructor(private authService:AuthService,private router:Router) {
    this.router.events.subscribe(e=>{
      this.isAuthorized=this.authService.isAuth();
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

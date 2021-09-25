import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  public hasError:boolean=false;
  public username:FormControl=new FormControl();
 public password:FormControl=new FormControl();
 public formGroup:FormGroup=new FormGroup({"username":this.username,"password":this.password});

  constructor(private authService:AuthService,private routerHandler:Router) {

  }

  auth(){
    this.hasError=false;
    this.authService.authErrorHandler.subscribe(e=> {
      this.hasError = true
    });
    this.authService.auth(this.username.value,this.password.value);
  }

  ngOnInit(): void {
  }

}

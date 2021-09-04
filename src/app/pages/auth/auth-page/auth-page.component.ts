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
  public username:FormControl=new FormControl();
 public password:FormControl=new FormControl();
 public formGroup:FormGroup=new FormGroup({"username":this.username,"password":this.password});

  constructor(private authService:AuthService,private routerHandler:Router) {

  }

  auth(){
    this.authService.auth(this.username.value,this.password.value);
  }

  ngOnInit(): void {
  }

}

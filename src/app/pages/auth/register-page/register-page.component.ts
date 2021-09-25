import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  hasError:boolean=false;
  login:FormControl=new FormControl();
  password:FormControl=new FormControl();
  formGroup:FormGroup=new FormGroup({login:this.login,password:this.password});

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  register():void{
    this.hasError=false;
    this.authService.authErrorHandler.subscribe(e=>this.hasError=true)
    this.authService.register(this.login.value,this.password.value);

  }

}

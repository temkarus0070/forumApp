import {Component, Injectable, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {NavigationExtras, Router} from "@angular/router";
import {Post} from "../../models/post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input("post")post:Post|null=null;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  isItCurrentUserPost():boolean{
    return this.authService.getUsername()===this.post?.user?.username;
  }

  editPost(){
    let navigationExtras:any={
        "post":JSON.stringify(this.post)
    };
    console.log(this.post);
    this.router.navigate(["post","edit"],{state:{post:this.post}});
  }





}

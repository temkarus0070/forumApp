import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  posts:Array<Post> =[];
  titleForSearch:FormControl=new FormControl();
  searchFormGroup:FormGroup=new FormGroup({titleForSearch:this.titleForSearch});


  constructor(private postService:PostService,private router:ActivatedRoute) {
    this.titleForSearch.valueChanges.subscribe(e=>{
      postService.loadByHeader(e).subscribe(e=>{
      this.posts=e;
      });
    })
  }

  ngOnInit(): void {
  }

}

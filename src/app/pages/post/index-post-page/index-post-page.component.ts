import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-index-post-page',
  templateUrl: './index-post-page.component.html',
  styleUrls: ['./index-post-page.component.css']
})
export class IndexPostPageComponent implements OnInit {

  posts:Array<Post>=new Array<Post>();

  constructor(private postService:PostService,private router:Router,private routerHandler:ActivatedRoute,private authService:AuthService) {

this.router.events.subscribe(e=>{
  this.routerHandler.params.subscribe(e=>{
    console.log(e.id);
    this.loadPosts(e.id);
  })


})
  }



  ngOnInit(): void {

  }

  loadPosts(sectionId?:number) {
    if(sectionId) {
      this.postService.loadBySection(sectionId).subscribe(posts => {
        this.posts = posts
      }, error => {
        console.log(error)
      });
    }
    else{
      this.postService.load().subscribe(posts => {
        this.posts = posts
      }, error => {
        console.log(error)
      });
    }
  }

  isAdmin():boolean{
    return this.authService.hasAdminRole();
  }

  remove(id:number):void{
    this.postService.remove(id).subscribe(e=>{
      this.loadPosts()
    },
      error => {
      console.log(error)
      });
  }


}

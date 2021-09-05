import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index-post-page',
  templateUrl: './index-post-page.component.html',
  styleUrls: ['./index-post-page.component.css']
})
export class IndexPostPageComponent implements OnInit {

  posts:Array<Post>=new Array<Post>();

  constructor(private postService:PostService,private router:Router) {
this.router.events.subscribe(e=>{
this.loadPosts();
})
  }



  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.load().subscribe(posts => {
      console.log(posts);
      this.posts = posts
    },error => {console.log(error)});
  }


}

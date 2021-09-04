import { Component, OnInit } from '@angular/core';
import {post} from "../../../models/post";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-index-post-page',
  templateUrl: './index-post-page.component.html',
  styleUrls: ['./index-post-page.component.css']
})
export class IndexPostPageComponent implements OnInit {

  posts:Array<post>=new Array<post>();

  constructor(private postService:PostService) {

  }



  ngOnInit(): void {
  this.postService.load().subscribe(posts=>
  {console.log(posts);
  this.posts=posts});

  }

}

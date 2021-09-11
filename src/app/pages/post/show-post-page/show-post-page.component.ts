import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../models/post";
import {Observable} from "rxjs";
import {CommentService} from "../../../services/CommentService";
import {Comment} from "../../../models/comment";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-show-post-page',
  templateUrl: './show-post-page.component.html',
  styleUrls: ['./show-post-page.component.css']
})
export class ShowPostPageComponent implements OnInit {
  comment:Comment={text:"",
  post:null, id:0, user:null};


  public post:Post={
    id:0,
    user:{username:""},
    header:"",
    date:new Date(),
    section:null,
    text:"",
    comments:[]
  };

  constructor(private router:ActivatedRoute,private commentService:CommentService,private postService:PostService) {
    router.data.subscribe(e=>
    {
      this.post = e.post;
    })

  }

  loadPostByTimeout(){
    setInterval(()=>this.loadPost(),1000);
  }

  loadPost(){
      this.postService.get(this.post.id).subscribe(e=>this.post=e);


  }

  createComment(){
    let comment:Comment={text:this.comment.text, post:{id:this.post.id} as Post} as Comment;
    this.commentService.create(comment);
  }

  deleteComment(id:number){
    this.commentService.delete(id);
    this.loadPost();
  }

  ngOnInit(): void {
  }

}

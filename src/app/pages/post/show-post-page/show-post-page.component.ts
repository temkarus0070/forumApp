import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../models/post";
import {Observable} from "rxjs";
import {CommentService} from "../../../services/CommentService";
import {Comment} from "../../../models/comment";

@Component({
  selector: 'app-show-post-page',
  templateUrl: './show-post-page.component.html',
  styleUrls: ['./show-post-page.component.css']
})
export class ShowPostPageComponent implements OnInit {
  comment:string="";


  public post:Post={
    id:0,
    author:null,
    header:"",
    date:new Date(),
    section:null,
    text:"",
    comments:[]
  };

  constructor(private router:ActivatedRoute,private commentService:CommentService) {
    router.data.subscribe(e=>
    {
      this.post = e.post;
      console.log(this.post);
    })

  }

  createComment(){
    let comment:Comment={text:this.comment,post:this.post,user:null,id:0};
    this.commentService.create(comment);
  }

  deleteComment(id:number){
    this.commentService.delete(id);
  }

  ngOnInit(): void {
  }

}

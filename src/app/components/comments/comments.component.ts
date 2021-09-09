import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from "../../services/CommentService";
import {Comment} from "../../models/comment";
import {Post} from "../../models/post";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  text:String="";
  @Input("postId")postId:number=0;
  @Input("comments") comments:Array<Comment>=[];


  constructor(private commentService:CommentService,private authService:AuthService) {

  }

  canDeleteComment(comment:Comment):boolean{
    return this.authService.hasAdminRole() || comment?.user?.username===this.authService.getUsername()
  }

  addNewComment(){
    let comment:Comment={text:this.text,post:{id:this.postId} as Post,user:{username:this.authService.getUsername()} } as Comment ;
    this.commentService.create(comment);
    this.comments.push(comment);
  }

  deleteCommentFromPost(commentId:number){
    this.commentService.delete(commentId);
    this.comments=this.comments.filter(e=>e.id!=commentId);
  }

  ngOnInit(): void {
  }

}
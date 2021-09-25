import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from "../../services/CommentService";
import {Comment} from "../../models/comment";
import {Post} from "../../models/post";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  public userCommentsUnderEditing:Map<Comment,string>=new Map<Comment, string>();
  public isUserCommentsUnderEditingMap:Map<Comment, boolean>=new Map<Comment, boolean>()
  public textControl:FormControl=new FormControl("",[Validators.required]);
  public formGroup:FormGroup=new FormGroup({"text":this.textControl});

  @Input("postId")postId:number=0;
  @Input("comments") comments:Array<Comment>=[];
  @Output("addComment") addComment:EventEmitter<any>=new EventEmitter<any>();


  constructor(private commentService:CommentService,private authService:AuthService) {

  }

  setEditFlag(comment:Comment){
    this.isUserCommentsUnderEditingMap.set(comment,true);
    this.userCommentsUnderEditing.set(comment,comment.text);
  }

  updateComment(event:any,comment:Comment){
    this.userCommentsUnderEditing.set(comment,event.target.value);
  }

  saveComment(comment:Comment){
    comment.text=this.userCommentsUnderEditing.get(comment) || comment.text;
    this.commentService.update(comment).subscribe(e=>{
      this.cancelUpdate(comment);
    });
  }

  isAuthor(comment:Comment){
    return comment.user?.username===this.authService.getUsername();
  }

  cancelUpdate(comment:Comment){
    this.isUserCommentsUnderEditingMap.set(comment,false);
    this.userCommentsUnderEditing.delete(comment);
  }

  canDeleteComment(comment:Comment):boolean{
    return this.authService.hasAdminRole() || comment?.user?.username===this.authService.getUsername()
  }

  addNewComment(){
    let comment:Comment={text:this.repairTextFromQuoutes(this.textControl.value),post:{id:this.postId} as Post,user:{username:this.authService.getUsername()} } as Comment ;
    this.commentService.create(comment).subscribe(e=>
    this.comments.push(e),
      error => {
      console.log("comment error");
      });

    this.addComment.emit("");

  }

  checkBug(comment:Comment){
    console.log("bug check");

    console.log(this.isUserCommentsUnderEditingMap.get(comment)===false);
    console.log(this.isUserCommentsUnderEditingMap.get(comment)===undefined);
    console.log(this.isAuthor(comment));
  }

  deleteCommentFromPost(commentId:number){
    this.commentService.delete(commentId);
    this.comments=this.comments.filter(e=>e.id!=commentId);
  }

  ngOnInit(): void {
  }

  repairTextFromQuoutes(text:string):string{
    return text.replace(/"/g, '\\"');
  }

}

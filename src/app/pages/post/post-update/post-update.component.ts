import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../models/post";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Section} from "../../../models/Section";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {
  private sectionName:string="";
  public post:Post={} as Post
  public availableSections:Array<Section>=[];
  public headerControl:FormControl=new FormControl(this.post?.header,[Validators.required]);
  public textControl:FormControl=new FormControl(this.post?.text,[Validators.required]);
  public sectionControl:FormControl=new FormControl(this.post?.section?.name,[Validators.required]);
  public formGroup:FormGroup=new FormGroup({"text":this.textControl,"section":this.sectionControl,"header":this.headerControl});

  constructor(private router:ActivatedRoute,private postService:PostService) {
    this.post=window.history.state.post;
    this.sectionName=this.post.section?.name+"";
    console.log(this.post);
    this.setDataToForm();
    this.router.data.subscribe(e=>this.availableSections=e.sections);
  }

  onChange(ev:any){
    console.log("event");
    this.sectionName=ev.source.selected.viewValue;
    console.log(this.sectionName);
  }

  setDataToForm(){
    this.headerControl.setValue(this.post.header);
    this.textControl.setValue(this.post.text);
    this.sectionControl.setValue(this.post.section?.id)
  }

  ngOnInit(): void {
    this.router.params.subscribe(e=>{

    })
  }

  hasErrors():boolean{
    return this.sectionControl.hasError('required')||this.headerControl.hasError('required')
      || this.textControl.hasError('required');
  }

  updatePost(){
    let post:Post={
      text:this.repairTextFromQuoutes(this.textControl.value),
      user:this.post.user,
      header:this.repairTextFromQuoutes(this.headerControl.value),
      section:{
        id:Number(this.sectionControl.value),
        name:this.sectionName,
        posts:[]
      },
      date:new Date(),
      id:this.post.id,
      comments:[]
    };
    this.postService.update(post);
  }

  repairTextFromQuoutes(text:string):string{
    return text.replace(/"/g, '\\"');
  }

}

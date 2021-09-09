import { Component, OnInit } from '@angular/core';
import {SectionService} from "../../../services/sectionService";
import {Section} from "../../../models/Section";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-post-create-page',
  templateUrl: './post-create-page.component.html',
  styleUrls: ['./post-create-page.component.css']
})
export class PostCreatePageComponent implements OnInit {


  public availableSections:Array<Section>=[];
  headerControl:FormControl=new FormControl("",[Validators.required]);
  textControl:FormControl=new FormControl("",[Validators.required]);
  sectionControl:FormControl=new FormControl("",[Validators.required]);
  formGroup:FormGroup=new FormGroup({"text":this.textControl,"section":this.sectionControl,"header":this.headerControl});

  constructor(private sectionService:SectionService,private router:Router,private postService:PostService) {
    router.events.subscribe(e=>{
      sectionService.load().subscribe(
        e=> {
          this.availableSections = e
        }
      )
    })
  }



  ngOnInit(): void {
  }

  hasErrors():boolean{
    return this.sectionControl.hasError('required')||this.headerControl.hasError('required')
    || this.textControl.hasError('required');
  }

  createPost(){
    let post:Post={
      text:this.repairTextFromQuoutes(this.textControl.value),
      user:null,
      header:this.repairTextFromQuoutes(this.headerControl.value),
      section:{
        id:Number(this.sectionControl.value),
        name:""
      },
      date:new Date(),
      id:0,
      comments:[]
    };
    this.postService.create(post);
  }

  repairTextFromQuoutes(text:string):string{
    return text.replace(/"/g, '\\"');
  }

}

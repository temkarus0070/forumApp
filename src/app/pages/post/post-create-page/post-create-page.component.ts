import { Component, OnInit } from '@angular/core';
import {SectionService} from "../../../services/sectionService";
import {Section} from "../../../models/Section";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-post-create-page',
  templateUrl: './post-create-page.component.html',
  styleUrls: ['./post-create-page.component.css']
})
export class PostCreatePageComponent implements OnInit {


  public availableSections:Array<Section>=[];
  headerControl:FormControl=new FormControl();
  textControl:FormControl=new FormControl();
  sectionControl:FormControl=new FormControl();
  formGroup:FormGroup=new FormGroup({"text":this.textControl,"section":this.sectionControl,"header":this.headerControl});

  constructor(private sectionService:SectionService,private router:Router,private postService:PostService) {
    router.events.subscribe(e=>{
      sectionService.load().subscribe(
        e=> {
          console.log("sections downloaded")
          console.log(e);
          this.availableSections = e
        }
      )
    })
  }



  ngOnInit(): void {
  }

  createPost(){
    let post:Post={
      text:this.textControl.value,
      author:null,
      header:this.headerControl.value,
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

}

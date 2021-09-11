import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SectionService} from "../../../services/sectionService";
import {Section} from "../../../models/Section";
import {Router} from "@angular/router";

@Component({
  selector: 'app-section-create',
  templateUrl: './section-create.component.html',
  styleUrls: ['./section-create.component.css']
})
export class SectionCreateComponent implements OnInit {
  public nameControl:FormControl=new FormControl("",[Validators.required]);
  public formGroup:FormGroup=new FormGroup({"name":this.nameControl});

  create(){
    let section:Section={
      name:this.nameControl.value,
      id:0,
      posts:[]
    };
    this.sectionService.create(section).subscribe(
      next=>{
        this.router.navigateByUrl("/");
      },
      error => {
        console.log(error);
      }
    );
  }



  constructor(private sectionService:SectionService,private router:Router) { }

  ngOnInit(): void {
  }

}

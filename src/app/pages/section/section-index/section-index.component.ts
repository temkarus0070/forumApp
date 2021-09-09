import { Component, OnInit } from '@angular/core';
import {SectionService} from "../../../services/sectionService";
import {Router} from "@angular/router";
import {Section} from "../../../models/Section";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-section-index',
  templateUrl: './section-index.component.html',
  styleUrls: ['./section-index.component.css']
})
export class SectionIndexComponent implements OnInit {
  public sections:Array<Section>=[];

  constructor(private sectionService:SectionService,private router:Router,private authService:AuthService) {
    this.router.events.subscribe(e=>{
      this.load();
    })
  }

  ngOnInit(): void {
  }

  isAdmin():boolean{
    return this.authService.hasAdminRole();
  }

  load(){
    this.sectionService.load().subscribe(e=>{
      this.sections=e;
    },
      error => {
      console.log(error);
      })
  }

  remove(id:number){
    this.sectionService.delete(id)
      .subscribe(e=>{
        this.load()
        },
        error => {
          console.log(error);
        });;
  }

}

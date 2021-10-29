import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  username:string | null="";
  postsCount:number=0;

  constructor(private router:ActivatedRoute) {
    this.router.paramMap.subscribe(e=>
    this.username=e.get("username"))
    this.router.data.subscribe(e=>{
      this.postsCount=e.postsCount;
    })
  }

  ngOnInit(): void {
  }

}

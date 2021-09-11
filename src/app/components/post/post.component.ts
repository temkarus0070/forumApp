import {Component, Injectable, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input("text") text:String="";
  @Input("author") author:String="";
  @Input("date") date:Date=new Date();
  @Input("header") header:String="";

  constructor() { }

  ngOnInit(): void {
  }





}

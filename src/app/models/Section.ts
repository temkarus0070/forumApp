import {Post} from "./post";

export interface Section{
  id:number,
  name:string,
  posts:Array<Post>
}

import {User} from "./user";
import {Post} from "./post";

export interface Comment{
  id:number,
  user:User|null;
  text:string;
  post:Post
}

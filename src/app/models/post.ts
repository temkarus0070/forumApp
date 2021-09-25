import {User} from "./user";
import {Section} from "./Section";
import {Comment} from "./comment";

export interface Post {
  id:number;
  header:string;
  user:User|null;
  date:Date;
  section:Section|null;
  text:string;
  comments:Array<Comment>
}

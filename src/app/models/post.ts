import {User} from "./user";
import {Section} from "./Section";

export interface Post {
  id:number;
  header:string;
  author:User|null;
  date:Date;
  section:Section|null;
  text:string;
}

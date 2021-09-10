import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostCreatePageComponent } from './pages/post/post-create-page/post-create-page.component';
import { ShowPostPageComponent } from './pages/post/show-post-page/show-post-page.component';
import { IndexPostPageComponent } from './pages/post/index-post-page/index-post-page.component';
import { AuthPageComponent } from './pages/auth/auth-page/auth-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule, Routes} from "@angular/router";
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomePageComponent } from './pages/home-page/home-page.component';
import {AuthInterceptor} from "./interceptors/AuthInterceptor";
import {PostResolver} from "./resolvers/postResolver";
import { SectionCreateComponent } from './pages/section/section-create/section-create.component';
import { SectionIndexComponent } from './pages/section/section-index/section-index.component';
import { PostComponent } from './components/post/post.component';
import { CommentsComponent } from './components/comments/comments.component';
import {EscapePipe} from "./pipes/EscapePipe";

export const routes:Routes=[{path:"login",component:AuthPageComponent},{path:"register", component:RegisterPageComponent},{path:"post/create",component:PostCreatePageComponent},
  {path:"",component:HomePageComponent},{path:"posts/:id",component:ShowPostPageComponent,resolve:{"post":PostResolver}},{path:"sections/:id",component:IndexPostPageComponent},
  {path:"section/create",component:SectionCreateComponent}];

@NgModule({
  declarations: [
    AppComponent,
    PostCreatePageComponent,
    ShowPostPageComponent,
    IndexPostPageComponent,
    AuthPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    SectionCreateComponent,
    SectionIndexComponent,
    PostComponent,
    CommentsComponent,
    EscapePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export const BACKEND_URL="http://localhost:8080"



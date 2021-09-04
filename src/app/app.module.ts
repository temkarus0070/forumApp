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

export const routes:Routes=[{path:"login",component:AuthPageComponent},{path:"register", component:RegisterPageComponent}];

@NgModule({
  declarations: [
    AppComponent,
    PostCreatePageComponent,
    ShowPostPageComponent,
    IndexPostPageComponent,
    AuthPageComponent,
    RegisterPageComponent,
    HomePageComponent
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



import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private AuthService:AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.AuthService.isAuth()){
      const authRrq=req.clone({
        headers:new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':this.AuthService.getToken(),
        })
      });
      return next.handle(authRrq);
    }else
      return next.handle(req);
  }

}

import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {UserService, AUTH_TOKEN } from './user.service';
import { Observable } from 'rxjs';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

/*@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(AUTH_TOKEN);
    if(token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${AUTH_PREFIX} ${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
} v0*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(AUTH_TOKEN);
    if(token) {
      //alert('request intercepted\n' + JSON.stringify(request));
      request = request.clone({
        setHeaders: {
          Authorization: `${AUTH_PREFIX} ${this.auth.getToken()}`
        }
      });
    }
    //alert("AuthInterceptor token: " + token);
    return next.handle(request);
  }
}
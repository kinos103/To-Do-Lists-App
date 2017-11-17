import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class MiddlewareService {

  // INJECT HTTPCLIENT FOR USE WITHIN THIS SERVICE
  constructor(private http: HttpClient) { }

  changeTitle()  {
    return this.http.get('http://localhost:3000/changeTitle')
      // IF ANY ERROR IS RETURNED WE WANT TO THROW IT SO THAT
      // THE SUBSCRIBERS STORE THE RESPONSE IN THE ERROR VARIABLE NOT THE DATA VARIABLE
      .catch((error: HttpResponse<string>) => Observable.throw(error.body));
  }
}

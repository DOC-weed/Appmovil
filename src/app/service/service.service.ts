import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user';
import { userlogin } from '../models/userLogin';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  Login(Userlogin: userlogin) {
    return this.http.post(this.url + '', Userlogin).toPromise();
  }
}

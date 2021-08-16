import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApi } from '@app/constants';
import { User } from '../login/user.model';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  
  saveUser (user: User) {
    return this.http.post(baseApi + '/users', user);
  }
  
  constructor(private http: HttpClient) { }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { userCacheVariable, tokenCacheVariable } from "@app/constants";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuthenticated: Boolean = false;

  constructor(private router: Router) { }

  verifyIfLogged () {
    if ( !this.isLogged() ) {
      this.router.navigate(['login']);
    }
  }

  isLogged () {
    return localStorage.getItem( tokenCacheVariable ) === 'true';
  }

  getUser () {
    return JSON.parse( localStorage.getItem( userCacheVariable ) || '' );
  }

  setUser (user : any) {
    localStorage.setItem( userCacheVariable, JSON.stringify( user ) );
  }

  login(user: User) {
    this.isAuthenticated = user.name === 'Paiva' && user.password === '123';
    
    if ( this.isAuthenticated ) {
      this.setUser(user);
      this.router.navigate(['search-movie']);
    }

    localStorage.setItem( tokenCacheVariable, this.isAuthenticated.toString() );
    return this.isAuthenticated;
  }
}

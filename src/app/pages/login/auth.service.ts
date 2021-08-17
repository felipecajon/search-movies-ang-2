import { Injectable, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { userCacheVariable, tokenCacheVariable, baseApi } from "@app/constants";
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    private isAuthenticated: boolean = false;
    hasError: boolean = false;
    message_errorLogin: string = '';
    isLoggedUser = new EventEmitter<boolean>();
    
    constructor(private router: Router, private translate: TranslateService, private http: HttpClient) {}
    
    verifyIfLogged () {
        const isLogged = this.isLogged();
        this.isLoggedUser.emit( isLogged );
        
        if ( !isLogged ) {
            this.router.navigate(['login']);
        }
    }
    
    isLogged () {
        return this.getToken() === 'true';
    }
    
    getToken () {
        return localStorage.getItem( tokenCacheVariable );
    }
    
    setToken (token: string) {
        localStorage.setItem( tokenCacheVariable, token );
    }
    
    removeToken () {
        localStorage.removeItem( tokenCacheVariable );
    }
    
    getUser () {
        return JSON.parse( localStorage.getItem( userCacheVariable ) || '' );
    }
    
    setUser (user : any) {
        localStorage.setItem( userCacheVariable, JSON.stringify( user ) );
    }
    
    removeUser () {
        localStorage.removeItem( userCacheVariable );
    }
    
    async login(user: User) {
        const users: any = await this.getUsers().toPromise();
        this.isAuthenticated = users.find((e: User) => e.email === user.email && e.password === user.password) !== undefined;
        
        if ( this.isAuthenticated ) {
            this.setUser(user);
            this.router.navigate(['search']);
            this.setToken( this.isAuthenticated.toString() )
        }
        
        this.isLoggedUser.emit( this.isAuthenticated );
        this.message_errorLogin = await this.translate.get('login.error.invalidLogin').toPromise();
        
        return {isLogged: this.isAuthenticated, message: this.message_errorLogin};
    }
    
    logout () {
        this.removeToken();
        this.removeUser();
        this.isLoggedUser.emit( false );
        this.router.navigate(['login']);
    }
    
    getUsers (): Observable<User> {
        return this.http.get(`${baseApi}/users`);
    }
}

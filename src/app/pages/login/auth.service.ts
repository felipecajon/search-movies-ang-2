import { Injectable, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { userCacheVariable, tokenCacheVariable } from "@app/constants";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    private isAuthenticated: boolean = false;
    hasError: boolean = false;
    message_errorLogin: string = '';
    isLoggedUser = new EventEmitter<boolean>();
    
    constructor(private router: Router, private translate: TranslateService) {}
    
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
        this.isAuthenticated = user.name === 'Paiva' && user.password === '123';
        
        if ( this.isAuthenticated ) {
            this.setUser(user);
            debugger
            this.router.navigate(['search-movie']);
            this.setToken( this.isAuthenticated.toString() )
        }
        
        this.isLoggedUser.emit( this.isAuthenticated );
        this.translate.get('login.error.invalidLogin').subscribe((res: string) => this.message_errorLogin = res );
        
        return {isAuthenticated: this.isAuthenticated, message: !this.isAuthenticated ? this.message_errorLogin : ''};
    }
    
    logout () {
        this.removeToken();
        this.removeUser();
        this.isLoggedUser.emit( false );
        this.router.navigate(['login']);
    }
}

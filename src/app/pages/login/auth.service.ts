import { Injectable, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../model/user";
import { userCacheVariable, tokenCacheVariable, baseApi } from "@app/constants";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { deleteCookid, getCookie, setCookie } from "@app/utilities";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User | undefined;
  hasError: boolean = false;
  message_errorLogin: string = "";
  isLogged: boolean = false;
  isLogged$ = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.translate
      .get("login.error.invalidLogin")
      .subscribe((txt) => (this.message_errorLogin = txt));
  }

  isAuthenticated() {
    this.isLogged = this.getToken() === "true";

    if (!this.isLogged) {
      this.router.navigate(["login"]);
    }

    return this.isLogged;
  }

  getToken() {
    return getCookie(tokenCacheVariable);
  }

  setToken(token: string) {
    setCookie(tokenCacheVariable, token, 1);
  }

  removeToken() {
    deleteCookid(tokenCacheVariable);
    localStorage.removeItem(tokenCacheVariable);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(userCacheVariable) || "");
  }

  setCurrentUser(user: any) {
    localStorage.setItem(userCacheVariable, JSON.stringify(user));
  }

  removeCurrentUser() {
    localStorage.removeItem(userCacheVariable);
  }

  async login(user: User) {
    this.getUsers().subscribe((users: any) => {
      this.user = users.find(
        (e: User) => e.email === user.email && e.password === user.password
      );

      this.isLogged = this.user !== undefined;

      if (this.isLogged) {
        this.setCurrentUser(user);
        this.router.navigate(["search"]);
        this.setToken(this.isLogged.toString());
      }

      this.isLogged$.emit(this.isLogged);
    });

    return { isLogged: this.isLogged, message: this.message_errorLogin };
  }

  logout() {
    this.removeToken();
    this.removeCurrentUser();
    this.isLogged$.emit(false);
    this.router.navigate(["login"]);
  }

  getUsers(): Observable<User> {
    return this.http.get(`${baseApi}/users`);
  }
}

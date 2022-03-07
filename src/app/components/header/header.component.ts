import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/login/auth.service';
import { urlLogo } from "@constants";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  urlLogo = urlLogo;
  isLogged: boolean = false;
  isLogged$: Observable<boolean> = this.auth.isLogged$ || false;
  
  constructor(private auth: AuthService) {}
  
  ngOnInit(): void {
    this.checkLogged();  
  }

  checkLogged () {
    this.auth.isLogged$.subscribe(status => this.isLogged = status);
    this.isLogged = this.auth.isAuthenticated();
  }
}

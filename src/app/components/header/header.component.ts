import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/login/auth.service';
import { urlLogo } from "@constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  urlLogo = urlLogo;
  isLogged: boolean = false;
  
  constructor(private auth: AuthService) {
  }
  
  ngOnInit(): void {
    this.checkLogged();  
  }

  checkLogged () {
    this.auth.isLoggedUser.subscribe(res => {
      this.isLogged = res;
    });
  }
}

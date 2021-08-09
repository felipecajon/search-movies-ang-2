import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService) {
    this.logout();
  }

  ngOnInit(): void {
  }

  logout () {
    this.auth.logout();
  }
}

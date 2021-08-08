import { Component, OnInit } from '@angular/core';
import { AuthService } from '@pages/login/auth.service';
import { User } from '@pages/login/user.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})

export class MovieListComponent implements OnInit {
  user : User = {};

  constructor( private auth : AuthService) {}
  
  ngOnInit(): void {
    this.user = this.auth.getUser();
  } 
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

    if ( this.auth.isLogged() ) {
      this.router.navigate(['search-movie']);
    }

    this.formLogin = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  submit () {
    const {value} = this.formLogin;
debugger
    this.auth.login(value);
  }

  ngOnInit(): void {
  }

}

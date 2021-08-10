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
  requiredError: boolean = false;
  hasError: boolean = false;
  messages_invalidLogin: string = '';

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    debugger
    this.auth.verifyIfLogged();

    this.formLogin = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async submit () {
    const {value} = this.formLogin;
    const res = await this.auth.login(value).then();
    this.hasError = !res.isAuthenticated;
    this.messages_invalidLogin = res.message
  }

  ngOnInit(): void {
    
  }

}

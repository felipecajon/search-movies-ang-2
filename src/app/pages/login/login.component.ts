import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  requiredError: boolean = false;
  messages_invalidLogin: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.auth.isAuthenticated() && this.router.navigate(["search"]);
  }

  async submit() {
    const { value } = this.formLogin;
    const response = await this.auth.login(value).then();

    if (!response.isLogged) {
      this.messages_invalidLogin = response.message;
    }
  }
}

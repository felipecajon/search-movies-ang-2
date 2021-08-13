import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '@app/components/form/form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  formRegister: FormGroup;
  
  constructor(private formBuild: FormBuilder, private formService: FormService) {
    this.formRegister = this.formBuild.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {validators: this.formService.conferePassword()})
  }
  
  ngOnInit(): void {
  }
  
  submit () {
    this.formService.markControlAsTouched( this.formRegister );

    if ( this.formRegister.valid ) {
      console.log( this.formRegister.getRawValue() )
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '@app/components/form/form.service';
import { InputService } from '@app/components/form/input.service';
import { phone_with_cod } from '@app/components/form/masks';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  formRegister: FormGroup;
  model!: NgbDateStruct;
  phone_with_cod: string = phone_with_cod;
  
  constructor(private formBuild: FormBuilder, private formService: FormService, private inputService: InputService) {
    this.formRegister = this.formBuild.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      terms: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {validators: [this.formService.conferePassword(), this.formService.isValidDate()]})
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

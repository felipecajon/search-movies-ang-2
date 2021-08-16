import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '@app/components/form/form.service';
import { InputService } from '@app/components/form/input.service';
import { mask_phone_with_cod } from '@app/components/form/masks';
import { Option } from '@app/components/form/model/radio.models';
import { LoadFavorites } from '@app/store/movies/movies.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  formRegister: FormGroup;
  mask_phone_with_cod: string = mask_phone_with_cod;
  gender_options: Option[] = [
    {code: 'masc', value: 'Masculino'},
    {code: 'fem', value: 'Feminino'},
  ];
  cities: Option[] = [
    {code: '1', value: 'Mamborê'},
    {code: '2', value: 'Campo Mourão'},
    {code: '3', value: 'Curitiba'},
    {code: '4', value: 'Maringa'},
  ];
  labelTerms: string = '';
  
  constructor(private formBuild: FormBuilder, private formService: FormService, private inputService: InputService, private translate: TranslateService) {
    this.formRegister = this.formBuild.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required, this.inputService.isDate]],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      terms: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {validators: [this.formService.conferePassword()]})
  }
  
  ngOnInit(): void {
    this.translate.get('register.form.terms.label', {link: '/', innerHTML: 'true'}).subscribe(translate => this.labelTerms = translate);
  }
  
  submit () {
    this.formService.markControlAsTouched( this.formRegister );

    console.table( this.formRegister.value )
    
    if ( this.formRegister.valid ) {
      console.log( this.formRegister.getRawValue() )
    }
  }
}

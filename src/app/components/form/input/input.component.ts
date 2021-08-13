import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() id!: string;
  @Input() name!: string;
  @Input() label?: string
  @Input() type?: string = 'text';
  @Input() required!: string;
  @Input() customErrorMessage!: string;
  @Input() autocomplete?: string;
  @Input() placeholder!: string;
  @Input() containerClass?: string;
  @Input() labelClass?: string;
  @Input() inputClass?: string;

  errorMessage: string = '';
  errorList: string[] = [];
  hasError: boolean = false;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.placeholder && this.translate.get(this.placeholder).subscribe(res => this.placeholder = res);
    this.label && this.translate.get(this.label).subscribe(res => this.label = res);
    this.errorMessage && this.translate.get('form.error.required').subscribe(res => this.errorMessage = res);
  }

  getErrors (field: any) : string []{
    const local_errors = [];

    this.isRequired(field) && local_errors.push('O Campo é obrigatorio');
    this.hasCustomError(field) && local_errors.push( this.getCustomError(field) );
    this.hasMinLength(field) && local_errors.push( 'Quantidade Mínima de Caracteres ' + this.form.get(field)?.errors?.minlength.requiredLength );
    this.hasMaxLength(field) && local_errors.push( 'Quantidade Máxima de Caracteres ' + this.form.get(field)?.errors?.maxlength.requiredLength );
    this.isEmail(field) && local_errors.push( 'Insira um e-mail válido' );
    
    this.hasError = local_errors.length > 0;

    return local_errors;
  }

  isTouched (field : any) {
    return this.form.get(field)?.touched
  }

  isRequired (field: any): boolean {
    return this.isTouched(field) && this.form.get(field)!.errors?.required;
  }

  hasMinLength (field: any): boolean {
    return this.isTouched(field) && this.form.get(field)!.errors?.minlength;
  }

  hasMaxLength (field: any): boolean {
    return this.isTouched(field) && this.form.get(field)!.errors?.maxlength;
  }

  isEmail (field: any): boolean {
    return this.isTouched(field) && this.form.get(field)!.errors?.email;
  }

  hasCustomError (field: any): boolean {
    return this.form.get(field)?.errors !== null && this.form.get(field)?.errors?.customError !== undefined
  }

  getCustomError (field: any) : string {
    return this.form.get(field)?.errors && this.form.get(field)?.errors?.customError
  }

  classError(field : any) {
    return {
      'is-invalid': this.getError(field),
      'has-feedback': this.hasError
    }
  }

  getError (field: any) : string{
    return this.getErrors(field)[0];
  }
}

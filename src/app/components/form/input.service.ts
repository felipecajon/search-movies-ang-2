import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InputService {

  constructor() { }

  getErrors (field: any, form: any) : string [] {
    const local_errors = [];

    this.isRequired(field, form) && local_errors.push('O Campo é obrigatorio');
    this.hasCustomError(field, form) && local_errors.push( this.getCustomError(field, form) );
    this.hasMinLength(field, form) && local_errors.push( 'Quantidade Mínima de Caracteres ' + form.get(field, form)?.errors?.minlength.requiredLength );
    this.hasMaxLength(field, form) && local_errors.push( 'Quantidade Máxima de Caracteres ' + form.get(field, form)?.errors?.maxlength.requiredLength );
    this.isEmail(field, form) && local_errors.push( 'Insira um e-mail válido' );

    return local_errors;
  }

  isTouched (field: any, form: any) {
    return form.get(field)?.touched
  }

  isRequired (field: any, form: any): boolean {
    return this.isTouched(field, form) && form.get(field)!.errors?.required;
  }

  hasMinLength (field: any, form: any): boolean {
    return this.isTouched(field, form) && form.get(field)!.errors?.minlength;
  }

  hasMaxLength (field: any, form: any): boolean {
    return this.isTouched(field, form) && form.get(field)!.errors?.maxlength;
  }

  isEmail (field: any, form: any): boolean {
    return this.isTouched(field, form) && form.get(field)!.errors?.email;
  }

  hasCustomError (field: any, form: any): boolean {
    return form.get(field)?.errors !== null && form.get(field)?.errors?.customError !== undefined
  }

  getCustomError (field: any, form: any) : string {
    return form.get(field)?.errors && form.get(field)?.errors?.customError
  }

  getError (field: any, form: any) : string{
    return this.getErrors(field, form)[0];
  }
  
}

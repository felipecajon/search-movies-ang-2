import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

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
    
    isDate(c: AbstractControl): boolean {
        if ((c.value !== undefined && c.value !== '' && c.value != null)) {
            
            var {month} = c.value;
            var {day} = c.value;
            var {year} = c.value;
            
            if (month < 1 || month > 12) {
                return false;
            }
            
            if (day < 1 || day > 31) {
                return false;
            }
            
            if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
                return false;
            }
            
            if (month == 2) { // check for february 29th
                var isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
                
                if (day > 29 || (day === 29 && !isleap)) {
                    return false;
                }
            }
        }
        
        return true;
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

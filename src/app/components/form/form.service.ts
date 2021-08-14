import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputService } from './input.service';

@Injectable({
    providedIn: 'root'
})

export class FormService {
    
    language: string = 'pt';
    
    constructor(private inputService: InputService) { }
    
    markControlAsTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            
            if (control.controls) {
                this.markControlAsTouched(control);
            }
        });
    }
    
    conferePassword(passwordName: string = 'password', passwordConfirmName: string = 'passwordConfirm') {
        return (group: FormGroup) => {
            let password = group.controls[passwordName];
            let passWordConfirm = group.controls[passwordConfirmName];
            
            if (password.value !== passWordConfirm.value) {
                return passWordConfirm.setErrors({customError: 'As senhas não conferem'})
            }
        }
    }
    
    isValidDate(field: string = 'date') {
        return (group: FormGroup) => {
            let $input = group.controls[field];
            let { value } = $input;

            if ( value.length === 0 ) {
                return false;
            }
            
            const isValidDate = this.inputService.isDate( value );
            
            if ( !isValidDate ) {
                return $input.setErrors({customError: 'Data inválida'})
            }
        }
    }
}

import { Injectable } from '@angular/core';
import { DatePickerDate } from './model/input.models';
import * as moment from "moment";
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class InputService {
    
    language: string = 'pt';
    dateFormat_pt: string = 'DD-MM-YYYY';
    dateFormat_en: string = 'MM-DD-YYYY';
    
    constructor() { }
    
    getErrors (field: any, form: any) : string [] {
        const local_errors = [];
        
        this.hasRequiredError(field, form) && local_errors.push('O Campo é obrigatorio');
        this.hasCustomError(field, form) && local_errors.push( this.getCustomError(field, form) );
        this.hasMinLengthError(field, form) && local_errors.push( 'Quantidade Mínima de Caracteres ' + form.get(field, form)?.errors?.minlength.requiredLength );
        this.hasMaxLengthError(field, form) && local_errors.push( 'Quantidade Máxima de Caracteres ' + form.get(field, form)?.errors?.maxlength.requiredLength );
        this.hasEmailError(field, form) && local_errors.push( 'Insira um e-mail válido' );
        this.hasDateError(field, form) && local_errors.push( 'Data inválida' );
        
        return local_errors;
    }
    
    isTouched (field: any, form: any) {
        return form.get(field)?.touched
    }
    
    hasRequiredError (field: any, form: any): boolean {
        return this.isTouched(field, form) && form.get(field)!.errors?.required;
    }
    
    hasMinLengthError (field: any, form: any): boolean {
        return this.isTouched(field, form) && form.get(field)!.errors?.minlength;
    }
    
    hasMaxLengthError (field: any, form: any): boolean {
        return this.isTouched(field, form) && form.get(field)!.errors?.maxlength;
    }
    
    hasEmailError (field: any, form: any): boolean {
        return this.isTouched(field, form) && form.get(field)!.errors?.email;
    }
    
    hasDateError (field: any, form: any): boolean {
        return this.isTouched(field, form) && form.get(field)!.errors?.date;
    }
    
    isDate ($input: AbstractControl): any {
        const inputService = new InputService();
        const { language, dateFormat_pt, dateFormat_en, isValidDate } = inputService;
        let dateFormat = '';

        if ( language === 'pt' ) {
            dateFormat = dateFormat_pt;
        }
        
        if ( language === 'en' ) {
            dateFormat = dateFormat_en;
        }
        
        const isValid = isValidDate( $input.value, dateFormat );
        
        return isValid ? null : {date: 'Data inválida'}
    }
    
    isValidDate (date: string, dateFormat: string): boolean {
        return date.length === 10 && moment(date, dateFormat).isValid();
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
    
    convertDate_String_To_Object (value: string, language = this.language): DatePickerDate {
        let day: number = 0;
        let month: number = 0;
        let year: number = 0;
        
        if ( language === 'pt' ) {
            day = parseInt( value.split('/')[0] );
            month = parseInt( value.split('/')[1] );
            year = parseInt( value.split('/')[2] );
        }
        
        if ( language === 'en' ) {
            day = parseInt( value.split('/')[1] );
            month = parseInt( value.split('/')[0] );
            year = parseInt( value.split('/')[2] );
        }
        
        return {day, month, year}
    }
    
    convertDate_Object_To_String (date: DatePickerDate, language = this.language) {
        let newDate: string = '';
        const padStart = (number : number) => {
            return number < 10 ? `0${number}` : number; 
        }
        
        if ( language === 'pt' ) {
            newDate = `${padStart(date.day)}/${padStart(date.month)}/${date.year}`;
        }
        
        if ( language === 'en' ) {
            newDate = `${padStart(date.month)}/${padStart(date.day)}/${date.year}`;
        }
        
        return newDate;
    }
}

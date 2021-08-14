import { Injectable } from '@angular/core';
import { DatePickerDate } from './model/input.models';
import * as moment from "moment";
import { FormControl, FormGroup } from '@angular/forms';
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

    isDate (value: string): boolean {
        let dateFormat = '';

        if ( this.language === 'pt' ) {
            dateFormat = this.dateFormat_pt;
        }

        if ( this.language === 'en' ) {
            dateFormat = this.dateFormat_en;
        }

        return moment(value, dateFormat).isValid() && value.length === 10;
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

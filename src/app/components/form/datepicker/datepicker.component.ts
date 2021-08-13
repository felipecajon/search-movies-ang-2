import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { InputService } from '../input.service';

export const DATEPICKER_VALUE_ACCESSOR =  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

interface Date {
    day: number;
    month: number;
    year: number
}

@Component({
    selector: 'app-date-picker',
    templateUrl: './datepicker.component.html',
    providers: [DATEPICKER_VALUE_ACCESSOR]
})

export class DatepickerComponent implements OnInit {
    @Input() form!: FormGroup;
    @Input() id!: string;
    @Input() name!: string;
    @Input() label?: string
    @Input() type?: string = 'text';
    @Input() required!: string;
    @Input() customErrorMessage!: string;
    @Input() placeholder!: string;
    @Input() containerClass?: string;
    @Input() labelClass?: string;
    @Input() inputClass?: string;
    
    hasError: boolean = false;
    
    currentDate = new Date().getDate();
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    selectedDate: Date = {day: this.currentDate, month: this.currentMonth, year: this.currentYear};
    disabled = false;
    principalValue: string = '';
    
    constructor(private translate: TranslateService, private inputService: InputService) { }
    
    
    ngOnInit(): void {
        this.placeholder && this.translate.get(this.placeholder).subscribe(res => this.placeholder = res);
        this.label && this.translate.get(this.label).subscribe(res => this.label = res);
    }
    
    getError (field: any, form: any) : string {
        const errors = this.getErrors(field, form);
        this.hasError = errors.length > 0;
        
        return errors[0];
    }
    
    getErrors (field: any, form: any) : string [] {
        return this.inputService.getErrors(field, form);
    }
    
    classError(field : any, form: any) {
        return {
            'is-invalid': this.getError(field, form),
            'has-feedback': this.hasError
        }
    }
    
    onChange = (date?: any) => {};
    
    keyup ($target: any, form: any, field: any): any {
        const {value} = $target;
        
        if ( value.length !== 10 ) {
            return false
        }
        
        this.selectedDate = this.convertDateToObject(value);
        form.get(field).value = this.selectedDate;
    }
    
    onDateSelect(value: NgbDate, form: any, field: any) {
        const {day} = value
        const {month} = value
        const {year} = value

        this.selectedDate = {day, month, year};
        form.get(field).value = this.selectedDate;
    }

    convertDateToObject (value: any): Date {
        let language = 'pt';

        let day: number = 0;
        let month: number = 0;
        let year: number = 0;

        if ( language === 'pt' ) {
            day = parseInt(value.substr(0, 2));
            month = parseInt(value.substr(3, 2));
            year = parseInt(value.substr(6, 4));
        }
        
        if ( language === 'en' ) {
            day = parseInt(value.substr(3, 2));
            month = parseInt(value.substr(0, 2));
            year = parseInt(value.substr(6, 4));
        }

        return {day, month, year}
    }
}

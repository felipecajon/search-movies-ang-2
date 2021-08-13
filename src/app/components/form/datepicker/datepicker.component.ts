import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { InputService } from '../input.service';

export const DATEPICKER_VALUE_ACCESSOR =  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

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
    @Input() autocomplete?: string;
    @Input() placeholder!: string;
    @Input() containerClass?: string;
    @Input() labelClass?: string;
    @Input() inputClass?: string;
    
    hasError: boolean = false;
    
    currentDate = new Date().getDate();
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    selectedDate: any = new Date(this.currentYear, this.currentMonth, this.currentDate);
    disabled = false;
    
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
    onTouched = () => {};
    
    writeValue(value: Date) {
        if (!value) return;
        
        this.selectedDate = {
            year: value.getFullYear(),
            month: value.getMonth(),
            day: value.getDate()
        }
    }
    
    registerOnChange(fn: (date: Date) => void): void {
        this.onChange = fn;
    }
    
    // Allows Angular to register a function to call when the input has been touched.
    // Save the function as a property to call later here.
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
    
    // Allows Angular to disable the input.
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    
    // Write change back to parent
    onDateChange(value: any) {
        this.onChange(value);
    }
    
    // Write change back to parent
    onDateSelect(value: any) {
        this.onChange(new Date(value.year, value.month - 1, value.day));
    }
    
}

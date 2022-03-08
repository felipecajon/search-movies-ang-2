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

@Component({
    selector: 'datePicker-component',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
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
    
    keyup ($target: any, form: any, field: any, $datePicker: any): any {
        const { value } = $target;
        
        form.get(field).setValue( value );

        if ( value.length !== 10 ) {
            return false
        }

        $datePicker.navigateTo( this.inputService.convertDate_String_To_Object( value ) );
    }
    
    onDateSelect(value: NgbDate, form: any, field: any) {
        form.get(field).setValue( this.inputService.convertDate_Object_To_String( value ) );
    }
}

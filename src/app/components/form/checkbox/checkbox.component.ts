import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { InputService } from '../input.service';

@Component({
  selector: 'checkbox-component',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})

export class CheckboxComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() id!: string;
  @Input() name!: string;
  @Input() label?: string;
  @Input() required!: string;
  @Input() containerClass?: string;
  @Input() labelClass?: string;
  @Input() inputClass?: string;
  
  hasError: boolean = false;
  
  constructor(private translate: TranslateService, private inputService: InputService) { }
  
  ngOnInit(): void {
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

  markThis () {
    const $input = this.form.get(this.name);
    const value = $input && $input.value;

    $input?.setValue(!value);
  }
  
  classError(field : any, form: any) {
    return {
      'is-invalid': this.getError(field, form),
      'has-feedback': this.hasError
    }
  }
  
}

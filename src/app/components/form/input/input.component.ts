import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
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
  @Input() autocomplete?: string;
  @Input() placeholder!: string;
  @Input() containerClass?: string;
  @Input() labelClass?: string;
  @Input() inputClass?: string;

  errorMessage: string = '';
  
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.placeholder && this.translate.get(this.placeholder).subscribe(res => this.placeholder = res);
    this.label && this.translate.get(this.label).subscribe(res => this.label = res);
    this.errorMessage && this.translate.get('form.error.required').subscribe(res => this.errorMessage = res);
  }

  isTouched (field : any) {
    return this.form.get(field)?.touched && !this.form.get(field)?.valid
  }

  errorRequired(field: any) {
    return this.isTouched(field) && this.form.get(field) && this.form.get(field)?.errors && this.form.get(field)?.errors?.required;
  }

  hasError(field : any) {
    return {
      'is-invalid': this.isTouched(field),
      'has-feedback': this.isTouched(field) 
    }
  }
}

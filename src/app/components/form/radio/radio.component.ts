import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { InputService } from '../input.service';
import { Option } from '../model/radio.models';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})

export class RadioComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() id!: string;
  @Input() name!: string;
  @Input() label?: string
  @Input() type?: string = 'text';
  @Input() required!: string;
  @Input() customErrorMessage!: string;
  @Input() autocomplete?: string;
  @Input() placeholder!: string;
  @Input() maxLength: number = 255;
  @Input() containerClass?: string;
  @Input() labelClass?: string;
  @Input() inputClass?: string;
  @Input() mask: string = '';
  @Input() hasIcon?: boolean;
  @Input() options?: Option[];
  
  hasError: boolean = false;
  
  constructor(private translate: TranslateService, private inputService: InputService) { }
  
  ngOnInit(): void {
      this.placeholder && this.translate.get(this.placeholder).subscribe(res => this.placeholder = res);
      this.label && this.translate.get(this.label).subscribe(res => this.label = res);
  }
  
  getError () : string {
      const errors = this.getErrors();
      this.hasError = errors.length > 0;
      
      return errors[0];
  }
  
  getErrors () : string [] {
      return this.inputService.getErrors(this.name, this.form);
  }
  
  classError() {
      return {
          'is-invalid': this.getError(),
          'has-feedback': this.hasError
      }
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Input() required!: boolean;
  @Input() autocomplete?: string;
  @Input() placeholder!: string;
  @Input() containerClass?: string;
  @Input() labelClass?: string;
  @Input() inputClass?: string;
  
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.get(this.placeholder).subscribe(res => {
      this.placeholder = res
    })
  }

}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormService } from "@app/components/form/form.service";
import { InputService } from "@app/components/form/input.service";
import { mask_phone_with_cod } from "@app/components/form/masks";
import { Option } from "@app/components/form/model/radio.models";
import { LoaderService } from "@app/components/loader/loader.service";
import { ToasterModel, ToasterType } from "@app/components/toaster/toaster.model";
import { ToasterService } from "@app/components/toaster/toaster.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-form-elements",
  templateUrl: "./form-elements.component.html",
  styleUrls: ["./form-elements.component.scss"],
})
export class FormElementsComponent implements OnInit {
  formElements: FormGroup;
  mask_phone_with_cod: string = mask_phone_with_cod;
  labelTerms: string = '';
  messageSuccess: string = '';

  cities: Option[] = [
    {code: '1', value: 'Option - 1'},
    {code: '2', value: 'Option - 2'},
    {code: '3', value: 'Option - 3'},
    {code: '4', value: 'Option - 4'},
  ];

  gender_options: Option[] = [
    {code: '1', value: 'Option - 1'},
    {code: '2', value: 'Option - 2'},
  ];

  constructor(
    private formBuild: FormBuilder,
    private inputService: InputService,
    private formService: FormService,
    private translate: TranslateService,
    private toaster: ToasterService,
    private loader: LoaderService 
  ) {
    this.formElements = this.formBuild.group(
      {
        name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        date: ["", [Validators.required, this.inputService.isDate]],
        phone: ["", [Validators.required, Validators.minLength(14)]],
        terms: ["", Validators.required],
        city: ["", Validators.required],
        gender: ["", Validators.required],
        password: ["", Validators.required],
        passwordConfirm: ["", Validators.required],
      },
      { validators: [this.formService.conferePassword()] }
    );
  }

  ngOnInit(): void {
    this.translate.get('styleGuide.form.terms.label', {link: '/', innerHTML: 'true'}).subscribe(translate => this.labelTerms = translate);
    this.translate.get('styleGuide.messages.success', {link: '/', innerHTML: 'true'}).subscribe(translate => this.messageSuccess = translate);
  }

  submit () {
    this.formService.markControlAsTouched( this.formElements );

    if ( this.formElements.valid ) {

      this.loader.toggle(true);

      const toaster: ToasterModel = {
        content: this.messageSuccess,
        type: ToasterType.SUCCESS
      }

      setTimeout(() => {
        this.toaster.init(toaster);
        this.loader.toggle(false);
        console.log( this.formElements.value );
      }, 500);
    }
  }
}

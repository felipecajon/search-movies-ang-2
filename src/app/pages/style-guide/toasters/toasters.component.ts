import { Component, OnInit } from '@angular/core';
import { ToasterModel, ToasterType } from '@app/components/toaster/toaster.model';
import { ToasterService } from '@app/components/toaster/toaster.service';

@Component({
  selector: 'toaster-components',
  templateUrl: './toasters.component.html',
  styleUrls: ['./toasters.component.scss']
})
export class ToastersComponent implements OnInit {

  constructor(private toaster: ToasterService) { }

  ngOnInit(): void {
  }

  addToaster (type: String) {

    function getType(type: String ): ToasterType {
      switch (type) {
        case 'success':
          return ToasterType.SUCCESS
        break;

        case 'danger':
          return ToasterType.DANGER
        break;

        case 'warning':
          return ToasterType.WARNING
        break;

        case 'info':
          return ToasterType.INFO
        break;

        case 'default':
          return ToasterType.DEFAULT
        break;

        default:
          return ToasterType.DEFAULT
        break;
      }
    }
    
    const toaster: ToasterModel = {
      title: `<p class="h5 m-0"> Title </p>`,
      content: `<p class="m-0"> Important Text! </p>`,
      type: getType(type)
    };
    
    this.toaster.init(toaster);
  }
}

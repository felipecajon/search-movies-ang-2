import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToasterModel } from './toaster.model';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'toaster-component',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})

export class ToasterComponent implements OnInit {

  toasters$: Observable<Array<ToasterModel>> = this.toasterServ.toasters$ || [];
  toasters: Array<ToasterModel> = [];
  active: boolean = false;

  constructor(private toasterServ: ToasterService) { }

  ngOnInit(): void {
    this.getToasters();
  }

  getToasters () {
    this.toasters$.subscribe(toasters => {
      this.addToasters(toasters);
    });

    this.addToasters(this.toasterServ.allToaster);
  }

  addToasters (toasters: Array<ToasterModel>) {
    this.toasters = toasters;
    this.active = this.toasters.length >= 1;
  }

  closeIt (el: HTMLElement, toasterID: String) {
    
    if (el && el.parentElement && el.parentElement.className) {
      el.parentElement.className += ' init-close';
    }

    setTimeout(() => {
      this.toasterServ.closeIt(toasterID);
    }, 500);
  }
}

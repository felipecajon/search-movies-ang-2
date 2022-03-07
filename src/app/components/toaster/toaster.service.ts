import { EventEmitter, Injectable } from '@angular/core';
import {ToasterModel} from './toaster.model';

@Injectable({
  providedIn: "root",
})

export class ToasterService {
  allToaster: Array<ToasterModel> = [];
  toasters$ = new EventEmitter<Array<ToasterModel>>();

  constructor() {}

  ID() : string {
    return Math.random().toString(36).substr(2, 8);
  }

  init(toaster: ToasterModel) {
    toaster.id = this.ID();
    this.allToaster.push(toaster);
    this.toasters$.emit( this.allToaster );
  }

  closeIt(toasterID: String) {
    this.allToaster = this.allToaster.filter(e => e.id != toasterID);
    this.toasters$.emit( this.allToaster );
  }
}

import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  
  status :boolean = false;
  activeLoader$ = new EventEmitter<boolean>();

  constructor() { }

  toggle (status: boolean) {
    this.status = status;
    this.activeLoader$.emit(status);
  }
}

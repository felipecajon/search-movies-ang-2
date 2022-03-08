import { Component, Input, OnInit } from '@angular/core';
import { ModalModel } from './modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

  @Input() modal!: ModalModel;
  
  constructor() { }

  ngOnInit(): void {
    if (!this.modal) {
      throw new TypeError("'Modal' is required")
    }
  }

  closeIt (modal: ModalModel) {
    modal.isActive = false;
  }

  closeByContainer (el: any, modal: ModalModel) {
    const isContainer = el && el.target && el.target.classList && el.target.classList.contains('js-container-modal');
    
    if (isContainer) {
      modal.isActive = false;
    }
  }
}

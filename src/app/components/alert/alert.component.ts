import { Component, Input, OnInit } from '@angular/core';
import { AlertModel } from './alert.model';

@Component({
  selector: 'alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {

  @Input() alert! : AlertModel;

  constructor() { }

  ngOnInit(): void {
  }

  closeIt(alert: AlertModel) {
    alert.isActive = false;
  }

}

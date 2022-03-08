import { Component, OnInit } from "@angular/core";
import { AlertModel } from "@app/components/alert/alert.model";

@Component({
  selector: "app-alerts",
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"],
})
export class AlertsComponent implements OnInit {
  alertPrimary: AlertModel = {
    content: "This is a Primary Alert, check it out!",
    isActive: true,
    type: 'primary'
  };

  alertSecondary: AlertModel = {
    content: "This is a Secondary Alert, check it out!",
    isActive: true,
    type: 'secondary'
  };

  alertSuccess: AlertModel = {
    content: "This is a Success Alert, check it out!",
    isActive: true,
    type: 'success'
  };

  alertDanger: AlertModel = {
    content: "This is a Danger Alert, check it out!",
    isActive: true,
    type: 'danger'
  };

  alertWarning: AlertModel = {
    content: "This is a Warning Alert, check it out!",
    isActive: true,
    type: 'warning'
  };

  alertInfo: AlertModel = {
    content: "This is a Info Alert, check it out!",
    isActive: true,
    type: 'info'
  };

  alertLight: AlertModel = {
    content: "This is a Light Alert, check it out!",
    isActive: true,
    type: 'light'
  };

  alertDark: AlertModel = {
    content: "This is a Dark Alert, check it out!",
    isActive: true,
    type: 'dark'
  };

  constructor() {}

  ngOnInit(): void {}
}

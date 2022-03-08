import { Component, OnInit } from "@angular/core";
import { ModalModel } from "@app/components/modal/modal.model";

@Component({
  selector: "modal-components-instance",
  templateUrl: "./modals.component.html",
  styleUrls: ["./modals.component.scss"],
})

export class ModalsComponent implements OnInit {
  modal1: ModalModel = {
    id: "testeModal-1",
    title: "Modal - 1",
    width: 600,
    isActive: false
  };

  modal2: ModalModel = {
    id: "testeModal-2",
    title: "Modal - 2",
    width: 400,
    isActive: false
  };

  constructor() {}

  ngOnInit(): void {}

  toggleModal(modal: ModalModel) {
    modal.isActive = !modal.isActive;
  }

  log(text: string) {
    alert(text);
  }
}

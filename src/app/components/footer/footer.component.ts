import { Component, OnInit } from '@angular/core';
import { urlLogoCompact } from "@constants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  urlLogoCompact = urlLogoCompact;
  
  constructor() { }

  ngOnInit(): void {
  }

}

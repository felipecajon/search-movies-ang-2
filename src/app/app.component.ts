import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor (private translate: TranslateService) {
    this.translate.setDefaultLang('pt');
  }

  ngOnInit () {
  }
}

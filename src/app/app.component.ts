import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@pages/login/auth.service';
import { QuestionBase } from './components/form-test/question-base';
import { QuestionService } from './components/form-test/question.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [QuestionService]
})

export class AppComponent {
  questions$: Observable<QuestionBase<any>[]>;

  constructor (private auth: AuthService, private router: Router, private translate: TranslateService, service: QuestionService) {
    this.auth.verifyIfLogged();
    this.translate.setDefaultLang('pt');
    this.questions$ = service.getQuestions();

  }

  ngOnInit () {
  }
}

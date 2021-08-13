import { Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES: any = {
    'pt': {
        weekdays: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
        months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    'en': {
        weekdays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
};

@Injectable()
export class I18n {
    language = 'pt';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
    constructor(private _i18n: I18n) {
        super();
    }
    
    getWeekdayShortName(weekday: number): any {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    }
    
    getMonthShortName(month: number): string {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    }
    
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }
    
    getDayAriaLabel(date: import('@ng-bootstrap/ng-bootstrap').NgbDateStruct): string {
        return date.day.toString();
    }
}
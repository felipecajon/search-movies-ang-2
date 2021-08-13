import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeartComponent } from '@components/icons/heart/heart.component';
import { HeartbrokenComponent } from '@components/icons/heartbroken/heartbroken.component';
import { HamburguerMenuComponent } from './hamburguer-menu/hamburguer-menu.component';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  declarations: [
    HeartComponent,
    HeartbrokenComponent,
    HamburguerMenuComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeartComponent,
    HeartbrokenComponent,
    HamburguerMenuComponent,
    CalendarComponent
  ]
})

export class IconsModule { }

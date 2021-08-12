import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeartComponent } from '../heart/heart.component';
import { HeartbrokenComponent } from '../heartbroken/heartbroken.component';



@NgModule({
  declarations: [
    HeartComponent,
    HeartbrokenComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeartComponent,
    HeartbrokenComponent
  ]
})

export class IconsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InputComponent } from './form/input/input.component';
import { IconsModule } from './icons/icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InputComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputComponent,
    IconsModule
  ]
})

export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '@app/app-routing.module';

import { HttpLoaderFactory } from '@app/app.module';
import { IconsModule } from './icons/icons/icons.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InputComponent } from './form/input/input.component';

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
    IconsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  exports: [
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    InputComponent,
    IconsModule
  ]
})

export class ComponentsModule { }

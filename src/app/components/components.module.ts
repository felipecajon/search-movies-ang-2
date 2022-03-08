import { NgModule } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '@app/app-routing.module';

import { IconsModule } from './icons/icons.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomFormModule } from './form/form.module';
import { AuthService } from '@app/pages/login/auth.service';
import { HttpLoaderFactory } from '@app/translator';
import { ToasterComponent } from './toaster/toaster.component';
import { CloseComponent as CloseToasterComponent } from './toaster/utilities/icons/close/close.component';
import { CloseComponent as  CloseModalComponent } from './modal/utilities/icons/close/close.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { CloseComponent } from './alert/utilities/icons/close/close.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ToasterComponent,
    CloseToasterComponent,
    CloseModalComponent,
    LoaderComponent,
    ModalComponent,
    AlertComponent,
    CloseComponent,
    TableComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    IconsModule,
    CustomFormModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    IconsModule,
    CustomFormModule,
    ToasterComponent,
    LoaderComponent,
    ModalComponent,
    AlertComponent,
    TableComponent
  ],
  providers: [AuthService],
})

export class ComponentsModule { }
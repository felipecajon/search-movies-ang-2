import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './pages/login/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { SearchMoviesComponent } from './pages/search-movies/search-movies.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DynamicFormQuestionComponent } from './components/form-test/input/dynamic-form-question.component';
import { DynamicFormComponent } from './components/form-test/form/dynamic-form.component';
import { InputComponent } from './components/form/input/input.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { HeartComponent } from './components/icons/heart/heart.component';
import { HeartbrokenComponent } from './components/icons/heartbroken/heartbroken.component';
import { StoreModule } from "@ngrx/store";
import { reducerMovies } from "./store/movies/movies.reducer";
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from './store/movies/movies.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MovieDetailsComponent } from './pages/search-movies/movie-details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SearchMoviesComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    InputComponent,
    LogoutComponent,
    HeartComponent,
    HeartbrokenComponent,
    MovieListComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      favorites: reducerMovies
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([MoviesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
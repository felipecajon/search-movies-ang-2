import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';

import { reducerMovies } from "@store/movies/movies.reducer";
import { MoviesEffects } from '@store/movies/movies.effects';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from '@components/components.module';

import { SearchMoviesComponent } from '@pages/search-movies/search-movies.component';
import { LoginComponent } from '@pages/login/login.component';
import { LogoutComponent } from '@pages/logout/logout.component';
import { MovieDetailsComponent } from '@pages/search-movies/movie-details/movie-details.component';
import { AppComponent } from './app.component';

import { AuthService } from '@pages/login/auth.service';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SearchMoviesComponent,
        LogoutComponent,
        MovieDetailsComponent,
        FavoritesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ComponentsModule,
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
        EffectsModule.forRoot([MoviesEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
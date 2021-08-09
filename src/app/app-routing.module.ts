import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { SearchMoviesComponent } from './pages/search-movies/search-movies.component';

const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'movie-list', component: MovieListComponent},
  { path: 'search-movie', component: SearchMoviesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

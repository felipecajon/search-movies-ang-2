import { Injectable } from '@angular/core';
import { Movie } from '@app/model/movie';
import { SearchMoviesService } from '@app/pages/search-movies/search-movies.service';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from "rxjs/operators";
import * as MovieActions from "./movies.actions";

@Injectable()

export class MoviesEffects {
  
  loadFavorites$ = this.actions$
    .pipe(
      ofType( MovieActions.LOAD_FAVORITES ),
      mergeMap(
        () => this.searchMovieService.getFavorites()
        .pipe(
          map( favorites => new MovieActions.LoadFavoritesSuccess(favorites)),
          catchError(error => of( new MovieActions.LoadFavoritesFailure(error) ))
        ),
      ),
    );
  

  // @Effect() loadFavorites$ = this.actions$
  //   .pipe(
  //     ofType<MovieActions.LoadFavorites>( MovieActions.LOAD_FAVORITES ),
  //     mergeMap(
  //       () => this.searchMovieService.getFavorites()
  //       .pipe(
  //         map( favorites => new MovieActions.LoadFavoritesSuccess(favorites)),
  //         catchError(error => of ( new MovieActions.LoadFavoritesFailure( error ))),
  //       ),
  //     ),
  //   );

  constructor(private actions$: Actions, private searchMovieService: SearchMoviesService) {}
  
}

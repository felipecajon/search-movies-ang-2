import { Injectable } from '@angular/core';
import { SearchMoviesService } from '@app/pages/search-movies/search-movies.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from "rxjs/operators";
import * as MovieActions from "./movies.actions";

@Injectable()

export class MoviesEffects {
  
  // loadFavorites$ = createEffect(() => this.actions$.pipe(
  //   ofTypee(MovieActions.),
  //   mergeMap(() => this.searchMovieService.getFavorites()
  //     .pipe(
  //       map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
  //       catchError(() => EMPTY)
  //     ))
  //   )
  // );
  
  constructor(private actions$: Actions, private searchMovieService: SearchMoviesService) {}
  
}

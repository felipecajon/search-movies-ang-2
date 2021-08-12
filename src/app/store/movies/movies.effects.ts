import { Injectable } from '@angular/core';
import { Movie } from '@app/model/movie';
import { SearchMoviesService } from '@app/pages/search-movies/search-movies.service';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from "rxjs/operators";
import * as MovieActions from "./movies.actions";

@Injectable()

export class MoviesEffects {
  
  loadFavorites$ = createEffect(() => 
    this.actions$
      .pipe(
        ofType<MovieActions.LoadFavorites>( MovieActions.LOAD_FAVORITES ),
        mergeMap(
          () => this.searchMovieService.getFavorites()
          .pipe(
            map( favorites => new MovieActions.LoadFavoritesSuccess(favorites)),
            catchError(error => of ( new MovieActions.LoadFavoritesFailure( error ))),
          ),
        ),
      )
  );

  favoriteIt$ = createEffect(() => 
    this.actions$
      .pipe(
        ofType<MovieActions.FavoriteIt>( MovieActions.FAVORITE_IT ),
        mergeMap(
          data => this.searchMovieService.favoriteIt(data.movie)
          .pipe(
            map( favorites => new MovieActions.FavoriteIt_Success(favorites)),
            catchError(error => of ( new MovieActions.FavoriteIt_Failure( error ))),
          ),
        ),
      )
  );

  disFavoriteIt$ = createEffect(() =>{
    return this.actions$
      .pipe(
        ofType<MovieActions.DisfavoriteIt>( MovieActions.DISFAVOR_IT ),
        mergeMap(
          data => this.searchMovieService.disfavorIt(data.movie)
          .pipe(
            map( () => new MovieActions.DisfavoriteIt_Success(data.movie)),
            catchError(error => of ( new MovieActions.DisfavoriteIt_Failure( error ))),
          ),
        ),
      )
  });

  constructor(private actions$: Actions, private searchMovieService: SearchMoviesService) {}
}

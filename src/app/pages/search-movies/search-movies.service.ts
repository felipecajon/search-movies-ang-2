import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiKey_omdbapi } from '@constants';
import { AppState } from '@app/app.state';
import { Movie } from '@app/model/movie';
import { Store } from '@ngrx/store';
import * as actionsMovie from "../../stateManager/movies.actions";

@Injectable({
  providedIn: 'root'
})

export class SearchMoviesService {
  
  constructor(private http: HttpClient, private store: Store<AppState>) { }
  
  favoriteIt (id: string, title: string) {
    this.store.dispatch(new actionsMovie.FavoriteIt({id, title}));
  }
  
  disfavorIt (id: string) {
    this.store.dispatch(new actionsMovie.DisfavoriteIt({id}));
  }
  
  getMovies (form: any) : Observable<any> {
    let configSearch = {
      params: {
        "apikey": apiKey_omdbapi,
        "plot": 'full',
        "t": `${form.name}`
      }
    }
    
    const url = 'https://www.omdbapi.com/';
    const mockUrl = '/assets/mock/movie.json';
    
    return this.http.get(mockUrl, configSearch);
  }
};
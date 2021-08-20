import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { apiKey_omdbapi, baseApi, baseApi_omdbapi } from '@constants';
import { AppState } from '@app/app.state';
import { Movie } from '@app/model/movie';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class SearchMoviesService {

  movie: EventEmitter<Movie> = new EventEmitter<Movie>();
  currentMovie?: Movie;

  constructor(private http: HttpClient, private store: Store<AppState>) { }
  
  favoriteIt (data: Movie) {
    return this.http.post(`${baseApi}/favorites`, {idMovie: data.idMovie, title: data.title});
  }
  
  disfavorIt (data: Movie) {
    return this.http.delete(`${baseApi}/favorites/${data.id}`);
  }

  getFavorites () : Observable<Movie[]> {
    return this.http.get<Movie[]>(`${baseApi}/favorites`);
  }
  
  getMovies (form: any) {
    let configSearch = {
      params: {
        "apikey": apiKey_omdbapi,
        "plot": 'full',
        "t": `${form.name}`,
        "i": `${form.identification}`
      }
    }
    
    const useMock = false;
    const url = useMock ? '/assets/mock/movie.json' : baseApi_omdbapi;
    
    this.http.get(url, configSearch).subscribe((res: any) => {
      
      if ( res.imdbID ) {
        this.currentMovie = {
          idMovie: res.imdbID,
          title: res.Title,
          description: res.Plot,
          image: res.Poster,
          director: res.Director,
          actor: res.Actors,
          year: res.Year,
          genre: res.Genre
        };
      } else {
        this.currentMovie = {};
      }

      this.movie?.emit( this.currentMovie );
    },
    error => {
      console.log(error)
    });
  }
};
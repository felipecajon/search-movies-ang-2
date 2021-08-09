import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiKey_omdbapi } from '@constants';

@Injectable({
  providedIn: 'root'
})

export class SearchMoviesService {
  
  constructor(private http: HttpClient) { }
  
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
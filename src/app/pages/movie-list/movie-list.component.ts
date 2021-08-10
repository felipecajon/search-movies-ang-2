import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/app.state';
import { Movie } from '@app/model/movie';
import { Store } from '@ngrx/store';
import * as actionsMovie from "../../stateManager/movies.actions";
import { SearchMoviesService } from '../search-movies/search-movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})

export class MovieListComponent implements OnInit {
  movies?: Movie[];
  
  constructor( private store: Store<AppState>, private searchMoviceService: SearchMoviesService) {
  }

  removeMovie (id: string) {
    this.searchMoviceService.disfavorIt(id);
  }
  
  ngOnInit(): void {
    this.store.select('movies').subscribe(movies => this.movies = movies);
  } 
}

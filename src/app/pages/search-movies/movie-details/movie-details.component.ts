import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@app/app.state';
import { Movie } from '@app/model/movie';
import { Store } from '@ngrx/store';
import * as actionFavorites from "../../../store/movies/movies.actions";
import { SearchMoviesService } from '../search-movies.service';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {
    
    @Input() movie!: Movie;
    isFavorite: boolean = false;
    isFetched: boolean = false;
    movieIsEmpty: boolean = true;
    
    constructor(private searchMovieService: SearchMoviesService, private store: Store<AppState>) {
    }
    
    ngOnInit(): void {
        this.getFavorites();
        this.getMovie();
    }

    getMovie () {
        this.searchMovieService.movie.subscribe((movie: Movie) => {
            this.movie = movie;
            this.isFetched = true;
            this.movieIsEmpty = this.movie.idMovie === undefined;
            
            this.movie && this.movie.idMovie && this.checkFavorite(this.movie.idMovie);
        });
    }

    getFavorites () {
        this.store.dispatch(new actionFavorites.LoadFavorites());
    }
    
    favoriteIt () {
        this.store.dispatch(new actionFavorites.FavoriteIt({idMovie: this.movie.idMovie, title: this.movie.title}));
    }
    
    disfavorIt () {
        let local_movie: any;

        this.store.select('favorites').subscribe((movies: Movie[]) => {
            local_movie = movies.find((movie: Movie) => movie.idMovie === this.movie.idMovie);
        })
        
        if ( local_movie && local_movie.id ) {
            this.store.dispatch( new actionFavorites.DisfavoriteIt( {id: local_movie.id} ) );
        }
    }
    
    toggleFavorite () {
        this.isFavorite ? this.disfavorIt() : this.favoriteIt();
    }
    
    checkFavorite (movieID: string) {
        this.store.select('favorites').subscribe((movies : Movie[]) => {
            this.isFavorite = movies.filter((favorite: Movie) => favorite.idMovie === movieID).length > 0;
        })
    }
}

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
    favorites: Movie[] = [];
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
        this.store.dispatch( new actionFavorites.LoadFavorites() );
        
        const favoritesObserver = {
            next: (favorites: Movie[]) => {
                this.store.dispatch( new actionFavorites.LoadFavoritesSuccess(favorites) );
                this.store.select('favorites').subscribe((favorites: Movie[]) => this.favorites = favorites);
            },
            error: (error: any) => {
                console.error( error );
                this.store.dispatch( new actionFavorites.LoadFavoritesFailure(error) );
            }
        }
        
        this.searchMovieService.getFavorites().subscribe(favoritesObserver);
    }
    
    favoriteIt () {
        this.store.dispatch( new actionFavorites.FavoriteIt() );
        
        const favoritesObserver = {
            next: (movie: Movie) => {
                this.movie.id = movie.id;
                this.store.dispatch( new actionFavorites.FavoriteIt_Success( {id: movie.id, title: movie.title, idMovie: movie.idMovie} ) );
                this.movie.idMovie && this.checkFavorite(this.movie.idMovie);
            },
            error: (error: any) => {
                console.error( error );
                this.store.dispatch( new actionFavorites.FavoriteIt_Failure(error) );
            }
        }
        
        this.movie.idMovie && this.movie.title && this.searchMovieService.favoriteIt(this.movie.idMovie, this.movie.title).subscribe(favoritesObserver);
    }
    
    disfavorIt () {
        this.store.dispatch( new actionFavorites.DisfavoriteIt() );
        const local_movie = this.favorites.find((movie: Movie) => movie.idMovie === this.movie.idMovie);
        
        if ( local_movie && local_movie.id ) {
            const favoritesObserver = {
                next: (movie: Movie) => {
                    this.store.dispatch( new actionFavorites.DisfavoriteIt_Success({id: local_movie.id}) );
                    this.movie.idMovie && this.checkFavorite(this.movie.idMovie);
                },
                error: (error: any) => {
                    console.error( error );
                    this.store.dispatch( new actionFavorites.DisfavoriteIt_Failure(error) );
                }
            }
            
            this.searchMovieService.disfavorIt(local_movie.id).subscribe(favoritesObserver);
        }
    }
    
    toggleFavorite () {
        this.isFavorite ? this.disfavorIt() : this.favoriteIt();
    }
    
    checkFavorite (movieID: string) {
        this.isFavorite = this.favorites.filter((favorite: Movie) => favorite.idMovie === movieID).length > 0;
    }
}

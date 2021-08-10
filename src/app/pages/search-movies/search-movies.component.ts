import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@app/app.state';
import { Movie } from '@app/model/movie';
import { Store } from '@ngrx/store';
import { AuthService } from '../login/auth.service';
import { SearchMoviesService } from './search-movies.service';

@Component({
    selector: 'app-search-movies',
    templateUrl: './search-movies.component.html',
    styleUrls: ['./search-movies.component.scss']
})

export class SearchMoviesComponent implements OnInit {
    formSearch: FormGroup;
    movie?: Movie;
    favorites?: Movie[];
    isFavorite: boolean= false;
    movie_ID: string = '';
    movie_TITLE: string = '';
    
    constructor( private formBuilder: FormBuilder, private searchMoviesSevice: SearchMoviesService, private auth: AuthService,  private store: Store<AppState>) {
        this.auth.verifyIfLogged();
        
        this.formSearch = this.formBuilder.group({
            name: new FormControl('batman', Validators.required)
        })
        
        this.submit();
    }
    
    ngOnInit(): void {
        this.getFavorites();
    }

    getFavorites () {
        this.store.select('movies').subscribe(res => {
            this.favorites = res;
            console.log(res)
        });
    }
    
    toggleFavorite (id: string, title: string, isFavorite: boolean) {
        
        if ( isFavorite ) {
            this.searchMoviesSevice.disfavorIt(id);
        } else {
            this.searchMoviesSevice.favoriteIt(id, title);
        }

        this.testFavorite(id);
    }

    testFavorite(id: string) {
        if ( this.favorites?.find(e => e.id === id) ) {
            this.isFavorite = true;
        } else {
            this.isFavorite = false;
        }
    }
    
    submit () {
        if ( this.formSearch.valid ) {
            this.searchMoviesSevice.getMovies( this.formSearch.getRawValue() ).subscribe((res : any) => {
                
                this.movie = {
                    id: res.imdbID,
                    title: res.Title,
                    description: res.Plot,
                    image: res.Poster,
                    director: res.Director,
                    actor: res.Actors,
                    year: res.Year,
                    genre: res.Genre
                }
                
                this.movie_ID = this.movie.id || '';
                this.movie_TITLE = this.movie.title || '';
                this.testFavorite( this.movie_ID );
            }, (error) => {
                console.error( error.statusText );
            });
        }
    }
}

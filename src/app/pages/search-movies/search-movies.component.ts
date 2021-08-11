import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@app/app.state';
import { Movie } from '@app/model/movie';
import { Store } from '@ngrx/store';
import { AuthService } from '../login/auth.service';
import { SearchMoviesService } from './search-movies.service';
import * as actionsMovie from "../../store/movies/movies.actions";

@Component({
    selector: 'app-search-movies',
    templateUrl: './search-movies.component.html',
    styleUrls: ['./search-movies.component.scss']
})

export class SearchMoviesComponent implements OnInit {
    formSearch: FormGroup;
    movie?: Movie;
    
    constructor( private formBuilder: FormBuilder, private searchMoviesSevice: SearchMoviesService, private auth: AuthService,  private store: Store<AppState>) {
        this.auth.verifyIfLogged();
        
        this.formSearch = this.formBuilder.group({
            name: new FormControl('batman', Validators.required)
        })
    }
    
    ngOnInit(): void {
        this.searchMoviesSevice.movie.subscribe(res => {
            this.movie = res;
        })
    }
    
    submit () {
        if ( this.formSearch.valid ) {
            this.searchMoviesSevice.getMovies( this.formSearch.getRawValue() );
        }
    }
}

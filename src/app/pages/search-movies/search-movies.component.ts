import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '@app/model/movie';
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
    
    constructor(
        private formBuilder: FormBuilder,
        private searchMoviesSevice: SearchMoviesService,
        private auth: AuthService
        ) {
        this.auth.verifyIfLogged();

        this.formSearch = this.formBuilder.group({
            name: new FormControl('batman', Validators.required)
        })

        this.submit();
    }
    
    ngOnInit(): void {
    }
    
    submit () {
        if ( this.formSearch.valid ) {
            this.searchMoviesSevice.getMovies( this.formSearch.getRawValue() ).subscribe((res : any) => {
                this.movie = {
                    title: res.Title,
                    description: res.Plot,
                    image: res.Poster,
                    director: res.Director,
                    actor: res.Actors,
                    year: res.Year,
                    genre: res.Genre
                }
            }, (error) => {
                console.error( error.statusText );
            });
        }
    }
}

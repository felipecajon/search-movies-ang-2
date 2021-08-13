import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '@app/app.state';
import { Movie } from '@app/model/movie';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { SearchMoviesService } from './search-movies.service';

@Component({
    selector: 'app-search-movies',
    templateUrl: './search-movies.component.html',
    styleUrls: ['./search-movies.component.scss']
})

export class SearchMoviesComponent implements OnInit {
    formSearch: FormGroup;
    movie$: Observable<Movie> = this.searchMoviesSevice.movie;
    movie?: Movie;
    isFetching: boolean = false;

    constructor( private formBuilder: FormBuilder, private searchMoviesSevice: SearchMoviesService, private auth: AuthService,  private store: Store<AppState>, private route: ActivatedRoute) {
        this.auth.verifyIfLogged();
        
        this.formSearch = this.formBuilder.group({
            name: new FormControl('batman'),
            identification: new FormControl('')
        }, {validator: this.customValidation()})

        this.route.params.subscribe( params => console.log(params));
    }
    
    customValidation() {
        return (group: FormGroup) => {
            let controlName = group.controls['name'];
            let controlIdentification = group.controls['identification'];

            if (controlName.value === '' && controlIdentification.value === '') {
                return controlName.setErrors({customError: 'O Campo é Obrigatorio'})
            }
        }
    }
    
    ngOnInit(): void {
        this.movie$.subscribe((movie: Movie) => {
            this.movie = movie;
            this.isFetching = false;
        });
    }
    
    submit () {
        if ( this.formSearch.valid ) {
            this.isFetching = true;
            this.searchMoviesSevice.getMovies( this.formSearch.getRawValue() );
        }
    }
}

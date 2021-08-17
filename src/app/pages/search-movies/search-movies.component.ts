import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '@app/app.state';
import { Favorite } from '@app/model/favorite';
import { Movie } from '@app/model/movie';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { SearchMoviesService } from './search-movies.service';
import * as moviesAction from "../../store/movies/movies.actions";

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
    favorites$: Observable<Favorite[]> = this.store.select('favorites');
    favorites: Favorite[] = [];

    constructor( private formBuilder: FormBuilder, private searchMoviesSevice: SearchMoviesService, private auth: AuthService,  private store: Store<AppState>, private route: ActivatedRoute) {
        this.auth.verifyIfLogged();
        
        this.formSearch = this.formBuilder.group({
            name: [''],
            identification: ['']
        }, {validator: [this.customValidation()]});
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

        this.searchById();
        this.getFavorites();
    }

    getFavorites () {
        this.store.dispatch(new moviesAction.LoadFavorites() );

        this.favorites$.subscribe((favorites: Favorite[]) => {
            this.favorites = favorites;
            this.searchById();
        });
    }

    searchById () {
        this.route.params.subscribe( params => {
            if (params.id) {
                const movie: any = this.favorites.find( (e: Favorite) => e.id === parseInt(params.id) );
                movie && this.formSearch.get('identification')?.setValue(movie.idMovie);
                this.submit();
            }
        });
    }
    
    submit () {
        
        console.log(this.formSearch.value);
        console.log(this.formSearch.valid);


        if ( this.formSearch.valid ) {
            this.isFetching = true;
            this.searchMoviesSevice.getMovies( this.formSearch.value );
        }
    }
}

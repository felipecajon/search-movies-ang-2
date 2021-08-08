import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-search-movies',
    templateUrl: './search-movies.component.html',
    styleUrls: ['./search-movies.component.scss']
})

export class SearchMoviesComponent implements OnInit {
    formSearch: FormGroup;
    
    constructor(private formBuilder: FormBuilder) {
        this.formSearch = this.formBuilder.group({
            name: new FormControl('', Validators.required)
        })
    }
    
    ngOnInit(): void {
    }

    submit () {
        console.log( this.formSearch.getRawValue() )
    }
    
}

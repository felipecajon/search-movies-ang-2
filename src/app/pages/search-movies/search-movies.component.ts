import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "@app/model/movie";
import { Observable } from "rxjs";
import { AuthService } from "../login/auth.service";
import { SearchMoviesService } from "./search-movies.service";

@Component({
  selector: "app-search-movies",
  templateUrl: "./search-movies.component.html",
  styleUrls: ["./search-movies.component.scss"],
})
export class SearchMoviesComponent implements OnInit, OnDestroy {
  formSearch: FormGroup;
  movie: Movie | undefined;
  currentMovie$: Observable<Movie> = this.searchMoviesSevice.currentMovie$;
  currentParam: string = '';
  isFetching: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private searchMoviesSevice: SearchMoviesService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formSearch = this.formBuilder.group(
      {
        name: [""],
        identification: [""],
      },
      { validator: [this.customValidation()] }
    );
  }

  customValidation() {
    return (group: FormGroup) => {
      let controlName = group.controls["name"];
      let controlIdentification = group.controls["identification"];

      if (
        controlName.touched &&
        controlName.value === "" &&
        controlIdentification.value === ""
      ) {
        return controlName.setErrors({ customError: "O Campo é Obrigatorio" });
      }
    };
  }

  ngOnInit(): void {
    this.auth.isAuthenticated() && this.start();
  }

  ngOnDestroy(): void {
  }

  start() {
    this.currentMovie$.subscribe((movie: Movie) => {
      this.movie = movie;
      this.isFetching = false;
      this.router.navigate(['search', movie.id]);
    });

    this.checkMovieID();
  }

  checkMovieID() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.currentParam = params.id;
        this.formSearch.get('identification')?.setValue(params.id);
        this.submit();
      }
    });
  }

  handlerSubmit() {
    debugger
    this.formSearch.markAllAsTouched();
    this.formSearch.get("name")?.updateValueAndValidity();
    const movieID = this.formSearch.get("identification")?.value;

    if (movieID && this.currentParam !== movieID) {
      this.router.navigate(['search', movieID]);
    }
  }

  submit() {
    if (!this.isFetching && this.formSearch.valid) {
      this.isFetching = true;
      this.searchMoviesSevice.searchMovie(this.formSearch.value);
    }
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { AppState } from "@app/app.state";
import { Movie } from "@app/model/movie";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as actionFavorites from "@store/movies/movies.actions";
import { SearchMoviesService } from "../search-movies.service";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.scss"],
})
export class MovieDetailsComponent implements OnInit {
  readonly favorites$: Observable<Movie[]> = this.store.select("favorites");
  movie: Movie | undefined;
  movie$: Observable<Movie> = this.searchMovieService.currentMovie$;
  isFavorite: boolean = false;
  isFetched: boolean = false;

  constructor(
    private searchMovieService: SearchMoviesService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getFavorites();
    this.getMovie();
  }

  getMovie() {
    this.movie$.subscribe((movie: Movie) => {
      this.movie = movie;
      this.isFetched = true;

      this.movie && this.movie.id && this.checkFavorite(this.movie.id);
    });
  }

  getFavorites() {
    this.store.dispatch(new actionFavorites.LoadFavorites());
  }

  favoriteIt() {
    this.movie &&
      this.store.dispatch(
        new actionFavorites.FavoriteIt({
          id: this.movie.id,
          title: this.movie.title,
        })
      );
  }

  disfavorIt() {
    this.movie &&
      this.store.dispatch(
        new actionFavorites.DisfavoriteIt({ id: this.movie.id })
      );
  }

  toggleFavorite() {
    this.isFavorite ? this.disfavorIt() : this.favoriteIt();
  }

  checkFavorite(movieID: string) {
    this.favorites$.subscribe((movies: Movie[]) => {
      this.isFavorite =
        movies.filter((favorite: Movie) => favorite.id === movieID).length > 0;
    });
  }
}

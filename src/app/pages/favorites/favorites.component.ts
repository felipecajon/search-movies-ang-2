import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actionFavorites from "@store/movies/movies.actions";
import { Favorite } from '@app/model/favorite';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  
  readonly favorites$: Observable<Favorite[]> = this.store.select('favorites');
  favorites?: Favorite[];
  
  constructor(private store: Store<AppState>, private auth: AuthService) { }
  
  ngOnInit(): void {
    this.auth.verifyIfLogged();
    this.getFavorites();
  }
  
  getFavorites () {
    this.store.dispatch( new actionFavorites.LoadFavorites() );
    this.favorites$.subscribe((favorites: Favorite[]) => this.favorites = favorites);
  }
  
  disfavorIt (id: number) {
    this.store.dispatch(new actionFavorites.DisfavoriteIt({id}))
  }
}

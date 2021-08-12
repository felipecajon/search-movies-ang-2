import { Favorite } from './model/favorite';
import { Movie } from './model/movie';

export interface AppState {
  readonly favorites: Favorite[];
}
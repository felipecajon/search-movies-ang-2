import { Movie } from './model/movie';

export interface AppState {
  readonly favorites: Movie[];
}
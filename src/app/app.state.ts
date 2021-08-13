import { Favorite } from './model/favorite';

export interface AppState {
  readonly favorites: Favorite[];
}
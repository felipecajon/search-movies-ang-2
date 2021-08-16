import { Favorite } from './model/favorite';
import { User } from './model/user';

export interface AppState {
  readonly favorites: Favorite[];
  readonly user: User[];
}
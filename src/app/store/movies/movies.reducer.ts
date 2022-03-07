import { Movie } from "../../model/movie";
import * as MovieActions from "./movies.actions";

export function reducerMovies (state: Movie[] = [], action: any) {
    switch (action.type) {
        case MovieActions.LOAD_FAVORITES_SUCCESS:
        return action.payload;

        case MovieActions.FAVORITE_IT_SUCCESS:
        return [...state, action.movie];
        
        case MovieActions.DISFAVOR_IT_SUCCESS:
        return state.filter((e: Movie) => e.id !== action.movie.id);
        
        default:
            console.log(action)
        return state;
    }
}
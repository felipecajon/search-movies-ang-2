import { Movie } from "../model/movie";
import * as MovieActions from "./movies.actions";

const INITIAL_STATE_MOVIE: Movie = {
    id: '123',
    title: 'abc'
};

export function reducerMovies (state: any = [], action: any) {
    switch (action.type) {
        case MovieActions.FAVORITE_IT: 
        return [...state, action.payload];

        case MovieActions.DISFAVOR_IT: 
        return state.filter((e: Movie) => e.id !== action.payload.id);
        
        default:
        return state;
    }
}
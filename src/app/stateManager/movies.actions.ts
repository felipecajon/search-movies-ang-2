import { Injectable } from '@angular/core'
import { Action } from "@ngrx/store";
import { Movie } from "../model/movie";

export const FAVORITE_IT = '[MOVIE] Favorite';
export const DISFAVOR_IT = '[MOVIE] Disafavor';

interface MovieSelector {
    id: string
};

export class FavoriteIt implements Action {
    readonly type = FAVORITE_IT;

    constructor (public payload: Movie) {}
}

export class DisfavoriteIt implements Action {
    readonly type = DISFAVOR_IT;

    constructor (public payload: MovieSelector) {}
}

export type Actions = FavoriteIt | DisfavoriteIt

import { Injectable } from '@angular/core'
import { Action } from "@ngrx/store";
import { Movie } from "../../model/movie";

export const FAVORITE_IT = '[FAVORITES] Favorite it - Try';
export const FAVORITE_IT_SUCCESS = '[FAVORITES] Favorite it - Success';
export const FAVORITE_IT_FAILURE = '[FAVORITES] Favorite it - Failure';

export const DISFAVOR_IT = '[FAVORITES] Disafavor it - Try';
export const DISFAVOR_IT_SUCCESS = '[FAVORITES] Disafavor it - Success';
export const DISFAVOR_IT_FAILURE = '[FAVORITES] Disafavor it - Failure';

export const LOAD_FAVORITES = '[FAVORITES] Get All Favorites - Try';
export const LOAD_FAVORITES_SUCCESS = '[FAVORITES] Get All Favorites - Success';
export const LOAD_FAVORITES_FAILURE = '[FAVORITES] Get All Favorites - Failure';

interface MovieSelector {
    id: string
};

// FAVORITE

export class FavoriteIt implements Action {
    readonly type = FAVORITE_IT;
}

export class FavoriteIt_Success implements Action {
    readonly type = FAVORITE_IT_SUCCESS;
    
    constructor ( public payload: Movie ) {}
}

export class FavoriteIt_Failure implements Action {
    readonly type = FAVORITE_IT_FAILURE;

    constructor (public payload: any) {}
}

// DISFAVOR

export class DisfavoriteIt implements Action {
    readonly type = DISFAVOR_IT;
}

export class DisfavoriteIt_Success implements Action {
    readonly type = DISFAVOR_IT_SUCCESS;
    
    constructor ( public payload: Movie ) {}
}

export class DisfavoriteIt_Failure implements Action {
    readonly type = DISFAVOR_IT_FAILURE;

    constructor (public payload: any) {}
}

// LOAD FAVORITES

export class LoadFavorites implements Action {
    readonly type = LOAD_FAVORITES;
}

export class LoadFavoritesSuccess implements Action {
    readonly type = LOAD_FAVORITES_SUCCESS;

    constructor (public payload: Movie[]) {}
}

export class LoadFavoritesFailure implements Action {
    readonly type = LOAD_FAVORITES_FAILURE;

    constructor (public payload: any) {}
}

export type Actions = 
FavoriteIt
FavoriteIt_Success
FavoriteIt_Failure

DisfavoriteIt
DisfavoriteIt_Success
DisfavoriteIt_Failure

LoadFavorites
LoadFavoritesSuccess
LoadFavoritesFailure

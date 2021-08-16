import { User } from "@app/model/user";
import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as ActionUser from './user.action';

export function userReducer (state: User = {}, action: any) {
    switch (action.type) {
        case (ActionUser.SAVE_USER):
        const { user } = action;
        return {...state, user}
        
        default:
        return state;
    }
}
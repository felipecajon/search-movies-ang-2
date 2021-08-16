import { Action } from "@ngrx/store";
import { User } from "@app/model/user";

export const SAVE_USER          ='[USER] - Save User';
export const SAVE_USER_SUCCESS  ='[USER] - Save User - Success';
export const SAVE_USER_FAIL     ='[USER] - Save User - Fail';

export const LOAD_USER          ='[USER] - Load User';
export const LOAD_USER_SUCCESS  ='[USER] - Load User - Success';
export const LOAD_USER_FAIL     ='[USER] - Load User - fail';

export class SaveUser implements Action{
    readonly type = SAVE_USER;

    constructor (public user : User) {}
}

export class SaveUserSuccess implements Action{
    readonly type = SAVE_USER_SUCCESS;

    constructor (public user : User) {}
}

export class SaveUserFail implements Action{
    readonly type = SAVE_USER_FAIL;

    constructor (public error : any) {}
}

export type Actions = SaveUser | SaveUserSuccess | SaveUserFail
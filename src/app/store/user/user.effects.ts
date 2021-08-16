import { Injectable } from "@angular/core";
import { User } from "@app/model/user";
import { RegisterService } from "@app/pages/register/register.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as UserAction from './user.action';

@Injectable()

export class UserEffects {
    saveUser$ = createEffect(() => 
        this.actions$
            .pipe (
                ofType<UserAction.SaveUser>( UserAction.SAVE_USER ),
                mergeMap(
                    data => this.registerService.saveUser(data.user)
                    .pipe(
                        map((user: User) => new UserAction.SaveUserSuccess( user )),
                        catchError(error => of ( new UserAction.SaveUserFail(error) ))
                    ),
                ),
            )
    );

    constructor (private actions$: Actions, private registerService: RegisterService) {}
}
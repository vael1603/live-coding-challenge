import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ItemsActions from "./actions"
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class ItemsEffect {
    constructor(private actions$: Actions){}

    loadItems$ = createEffect(() =>
        this.actions$.pipe(
        ofType(ItemsActions.loadItems),
        mergeMap(() =>
            this.itemsService.getItems()
            .pipe(
            map(items => ItemsActions.loadItemsSuccess({ items })),
            catchError(error => of(ItemsActions.loadItemsFailure({ error })))
            )
        )
        )
    );
}
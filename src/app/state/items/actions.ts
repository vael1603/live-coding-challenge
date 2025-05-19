import { createAction, props } from "@ngrx/store";
import { Item } from "./models";

export enum ItemsActionType {
    ITEMS_LOAD =         '[Items] Load',
    ITEMS_LOAD_SUCCESS = '[Items] Load Success',
    ITEMS_LOAD_FAILURE = '[Items] Load Failure'
}

export const loadItems = createAction(
    ItemsActionType.ITEMS_LOAD
)

export const loadItemsSuccess = createAction(
    ItemsActionType.ITEMS_LOAD_SUCCESS,
    props<{items: Item[]}>()
)

export const loadItemsFailure = createAction(
    ItemsActionType.ITEMS_LOAD_FAILURE,
    props<{error: any}>()
)
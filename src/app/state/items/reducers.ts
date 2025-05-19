import { createReducer, on } from "@ngrx/store";
import * as ItemsAction from "./actions";
import { Item } from "./models";

export interface ItemsState {
    items: Item[],
    loading: boolean;
    error: any;
}

export const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null
}

export const itemsReducer = createReducer(
    initialState,
    on(ItemsAction.loadItems, state => ({...state, loading: true})),
    on(ItemsAction.loadItemsSuccess, (state, { items }) => ({...state, loading: false, items})),
    on(ItemsAction.loadItemsFailure, (state, { error }) => ({...state, loading: false, error}))
)
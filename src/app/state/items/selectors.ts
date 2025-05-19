import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemsState } from "./reducers";

export const selectItemsState = createFeatureSelector<ItemsState>('items');

export const selectAllItems = createSelector(
    selectItemsState,
    (state) => state.items
)

export const selectItemsLoading = createSelector(
    selectItemsState,
    (state) => state.loading
)
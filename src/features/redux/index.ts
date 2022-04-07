import {
  CatchReducer,
  CatchState,
  initialCatchState,
} from '../pokemon-catch/catch-state'
import {
  initialSearchState,
  SearchReducer,
  SearchState,
} from '../pokemon-search/search-state'

export interface AppState {
  search: SearchState
  catch: CatchState
}

export const initialAppState = {
  search: initialSearchState,
  catch: initialCatchState,
}

export const reducers = {
  search: SearchReducer,
  catch: CatchReducer,
}

export interface ThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => AppState): void
}

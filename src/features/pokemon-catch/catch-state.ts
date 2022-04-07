import { Pokemon } from 'pokenode-ts'
import { ThunkAction } from '../redux'

export interface CatchedPokemon extends Pokemon {
  nickname: string
}

export interface CatchState {
  catching: boolean
  catched: CatchedPokemon[]
}

export const initialCatchState: CatchState = {
  catching: false,
  catched: [],
}

interface CatchActionTypes {
  readonly SET_CATCHING: 'SET_CATCHING'
  readonly SET_CATCHED: 'SET_CATCHED'
}

const catchActionTypes: CatchActionTypes = {
  SET_CATCHING: 'SET_CATCHING',
  SET_CATCHED: 'SET_CATCHED',
}

interface SetCatching {
  type: typeof catchActionTypes.SET_CATCHING
  payload: boolean
}

interface SetCatched {
  type: typeof catchActionTypes.SET_CATCHED
  payload: typeof initialCatchState.catched
}

export type CatchActions = SetCatching | SetCatched

export const catchActions = {
  setCatching: (state: boolean): ThunkAction<CatchActions> => {
    return (dispatch, getState) => {
      dispatch({
        type: catchActionTypes.SET_CATCHING,
        payload: state,
      })
    }
  },
  setCatched: (data: CatchedPokemon[]): ThunkAction<CatchActions> => {
    return (dispatch, getState) => {
      dispatch({
        type: catchActionTypes.SET_CATCHED,
        payload: data,
      })
    }
  },
  catchPokemon: (name: string, pokemon: Pokemon): ThunkAction<CatchActions> => {
    return async (dispatch, getState) => {
      const currentCatchedPokomon = getState().catch.catched
      // check if pokemon is already catched
      if (currentCatchedPokomon.find((p) => p.id === pokemon.id)) {
        return
      }
      // set catching to true
      catchActions.setCatching(true)(dispatch, getState)
      // add pokemon to catched list
      const newCatchedPokemonList = [
        ...currentCatchedPokomon,
        { nickname: name, ...pokemon },
      ]
      catchActions.setCatched(newCatchedPokemonList)(dispatch, getState)
      // store pokemon in local storage
      localStorage.setItem(
        'catchedPokemon',
        JSON.stringify(newCatchedPokemonList)
      )
      // set catching to false
      catchActions.setCatching(false)(dispatch, getState)
    }
  },
}

export const CatchReducer = (
  state: CatchState = initialCatchState,
  action: CatchActions
): CatchState => {
  if (state === undefined) {
    return initialCatchState
  }
  switch (action.type) {
    case catchActionTypes.SET_CATCHED:
      return {
        ...state,
        catched: action.payload,
      }
    case catchActionTypes.SET_CATCHING:
      return {
        ...state,
        catching: action.payload,
      }
    default:
      return state
  }
}

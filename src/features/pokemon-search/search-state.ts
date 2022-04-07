import { Pokemon } from 'pokenode-ts'
import { ThunkAction } from '../redux'
import searchPokemon from './api'

export interface SearchState {
  searching: boolean
  query: string
  offset: number
  limit: number
  total_pages: number
  results: Pokemon[]
}

export const initialSearchState: SearchState = {
  searching: false,
  query: '',
  offset: 0,
  limit: 100000,
  total_pages: 0,
  results: [],
}

interface SearchActionTypes {
  readonly SET_SEARCHING: 'SET_SEARCHING'
  readonly SET_QUERY: 'SET_SEARCH_QUERY'
  readonly SET_OFFSET: 'SET_OFFSET'
  readonly SET_LIMIT: 'SET_LIMIT'
  readonly SET_TOTAL_PAGES: 'SET_TOTAL_PAGES'
  readonly SET_DATA: 'SET_DATA'
}

const searchActionTypes: SearchActionTypes = {
  SET_SEARCHING: 'SET_SEARCHING',
  SET_QUERY: 'SET_SEARCH_QUERY',
  SET_OFFSET: 'SET_OFFSET',
  SET_LIMIT: 'SET_LIMIT',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_DATA: 'SET_DATA',
}

interface SetSearching {
  type: typeof searchActionTypes.SET_SEARCHING
  payload: boolean
}

interface SetQuery {
  type: typeof searchActionTypes.SET_QUERY
  payload: typeof initialSearchState.query
}

interface SetOffset {
  type: typeof searchActionTypes.SET_OFFSET
  payload: typeof initialSearchState.offset
}

interface SetLimit {
  type: typeof searchActionTypes.SET_LIMIT
  payload: typeof initialSearchState.limit
}

interface SetTotalPage {
  type: typeof searchActionTypes.SET_TOTAL_PAGES
  payload: typeof initialSearchState.total_pages
}

interface SetData {
  type: typeof searchActionTypes.SET_DATA
  payload: typeof initialSearchState.results
}

export type SearchActions =
  | SetSearching
  | SetQuery
  | SetOffset
  | SetLimit
  | SetTotalPage
  | SetData

export const searchActions = {
  setSearching: (state: boolean): ThunkAction<SearchActions> => {
    return (dispatch, getState) => {
      dispatch({
        type: searchActionTypes.SET_SEARCHING,
        payload: state,
      })
    }
  },
  setQuery: (query: string): ThunkAction<SearchActions> => {
    return (dispatch, getState) => {
      dispatch({
        type: searchActionTypes.SET_QUERY,
        payload: query,
      })
    }
  },
  setOffset: (offset: number): ThunkAction<SearchActions> => {
    return (dispatch, getState) => {
      dispatch({
        type: searchActionTypes.SET_OFFSET,
        payload: offset,
      })
    }
  },
  setLimit: (limit: number): ThunkAction<SearchActions> => {
    return (dispatch, getState) => {
      dispatch({
        type: searchActionTypes.SET_LIMIT,
        payload: limit,
      })
    }
  },
  setTotalPages: (total_pages: number): ThunkAction<SearchActions> => {
    return (dispatch, getState) => {
      dispatch({
        type: searchActionTypes.SET_TOTAL_PAGES,
        payload: total_pages,
      })
    }
  },
  setData: (data: Pokemon[]): ThunkAction<SearchActions> => {
    return (dispatch, getState) => {
      dispatch({
        type: searchActionTypes.SET_DATA,
        payload: data,
      })
    }
  },
  searchPokemon: (
    query: string,
    offset: number = 0,
    limit: number = 100000
  ): ThunkAction<SearchActions> => {
    return async (dispatch, getState) => {
      searchActions.setQuery(query)(dispatch, getState)
      searchActions.setOffset(offset)(dispatch, getState)
      searchActions.setLimit(limit)(dispatch, getState)
      searchActions.setSearching(true)(dispatch, getState)
      // start api call
      const results = await searchPokemon(
        getState().search.query,
        getState().search.offset
      )
      searchActions.setData(results.data)(dispatch, getState)
      searchActions.setTotalPages(results.total_pages)(dispatch, getState)
      searchActions.setSearching(false)(dispatch, getState)
    }
  },
}

export const SearchReducer = (
  state: SearchState = initialSearchState,
  action: SearchActions
): SearchState => {
  if (state === undefined) {
    return initialSearchState
  }
  switch (action.type) {
    case searchActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      }
    case searchActionTypes.SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      }
    case searchActionTypes.SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
      }
    case searchActionTypes.SET_TOTAL_PAGES:
      return {
        ...state,
        total_pages: action.payload,
      }
    case searchActionTypes.SET_DATA:
      return {
        ...state,
        results: action.payload,
      }
    default:
      return state
  }
}

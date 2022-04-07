import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import 'animate.css'
import PokemonDetail from './features/pokemon-detail'
import { Provider } from 'react-redux'
import { AppState, initialAppState } from './features/redux'
import configureStore from './features/redux/config'
import { CatchedPokemon } from './features/pokemon-catch/catch-state'
import PokemonCatch from './features/pokemon-catch'

// get the root element
const container = document.getElementById('root') as Element

// Create a root.
const root = ReactDOMClient.createRoot(container)
// get catched pokemon from local storage
const catchedPokemonData = localStorage.getItem('catchedPokemon')
let catchedPokemon: CatchedPokemon[] = []
if (catchedPokemonData) {
  catchedPokemon = JSON.parse(catchedPokemonData)
}
// redux initial state
const persistedState: AppState = {
  ...initialAppState,
  catch: {
    ...initialAppState.catch,
    catched: catchedPokemon,
  },
}
const store = configureStore(persistedState)

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/pokemon/:id" element={<PokemonDetail />}></Route>
          <Route path="/catched" element={<PokemonCatch />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

// Render the root.
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)

import clsx from 'clsx'
import { Pokemon } from 'pokenode-ts'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { catchActions, CatchedPokemon } from '../pokemon-catch/catch-state'
import { searchPokemonById } from '../pokemon-search/api'
import { AppState } from '../redux'

const PokemonDetail: FC = () => {
  const params = useParams()
  const nav = useNavigate()
  const dispatch = useDispatch()
  const pokemonId = params.id
  const [selected, setSelected] = useState<CatchedPokemon>()
  const [searched, setSearched] = useState(false)
  const searchResults = useSelector((state: AppState) => state.search.results)
  const catchedList = useSelector((state: AppState) => state.catch.catched)
  useEffect(() => {
    console.log(pokemonId)
    if (!pokemonId) return
    // find first from catched list
    if (catchedList.length) {
      const pokemon = catchedList.find((p) => p.id === Number(pokemonId))
      if (pokemon) {
        setSelected(pokemon)
        return
      }
    }
    if (searchResults.length) {
      const pokemon = searchResults.find((p) => p.id === Number(pokemonId))
      if (pokemon) {
        setSelected({ ...pokemon, nickname: '' })
        return
      }
    }
    searchPokemonById(Number(pokemonId)).then((res) => {
      setSearched(true)
      if (res) {
        setSelected({ ...res, nickname: '' })
      }
    })
  }, [pokemonId, searchResults])

  // at first we select the pokemon from the search results
  // if found, then we use this pokemon
  // if not found, we search for the pokemon from the api by id
  // if found, we set selected to this pokemon and set searched to true
  // to show loading indicator that we are searching for this pokemon from the api
  if (!selected) {
    return !searched ? (
      <div>Loading...</div>
    ) : (
      <div className="font-exo flex flex-col space-y-2">
        <p>Sorry! Pokémon not found</p>
        <Link to="/" className="btn text-center">
          Go back home
        </Link>
      </div>
    )
  }

  // handle the click event for catching the pokemon
  const handleCatch = () => {
    // show modal to set the pokemon name
    const nickName = prompt('Please enter the nick name for this pokemon')
    if (!nickName) return
    dispatch(catchActions.catchPokemon(nickName, selected))
    nav('/')
  }

  return (
    <div
      className={clsx(
        'relative card min-w-[300px] max-w-[500px] h-fit min-h-[400px]',
        {
          'border-sky-500 bg-sky-200': Boolean(selected.nickname),
        }
      )}
    >
      {!Boolean(selected.nickname) && (
        <button onClick={handleCatch} className="absolute btn top-4 right-4">
          Catch
        </button>
      )}
      <div className="flex flex-col justify-center">
        <img
          src={
            selected.sprites.front_default || 'https://via.placeholder.com/150'
          }
          alt="pokemon"
          className="rounded-full border border-slate-500 mb-2"
        />
        <div className="font-track text-center items-center flex flex-col space-x-2">
          <p>{selected.name}</p>
          {selected.nickname && (
            <p
              title="Nickname"
              className="font-fibre px-4 py-1 rounded-md bg-slate-200"
            >
              {selected.nickname}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <p className="font-exo">Types:</p>
        <div className="flex flex-row flex-wrap justify-start  space-y-1 mb-4">
          {selected.types.map((move, i) => (
            <p
              className="border border-current rounded-md px-2 py-1 bg-slate-400"
              key={i}
            >
              {move.type.name}
            </p>
          ))}
        </div>
        <p className="font-exo">Moves:</p>
        <div className="flex flex-row flex-wrap justify-start space-y-1 space-x-1 max-h-[230px] overflow-auto">
          {selected.moves.map((move, i) => (
            <p
              className="border border-current rounded-md px-2 py-1 bg-slate-400"
              key={i}
            >
              {move.move.name}
            </p>
          ))}
        </div>
        <Link
          to="/"
          className="btn mt-4 w-fit bottom-4 left-4 bg-sky-700 hover:bg-sky-200 hover:text-slate-900 text-slate-100"
        >
          Back
        </Link>
      </div>
    </div>
  )
}

export default PokemonDetail

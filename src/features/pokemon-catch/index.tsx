import clsx from 'clsx'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import GridItem from '../pokemon-search/pokemon-item'
import { AppState } from '../redux'

const PokemonCatch = () => {
  const catchedPokemonList = useSelector(
    (state: AppState) => state.catch.catched
  )

  return (
    <div className=" border-slate-900 w-screen h-screen pt-8 px-4">
      <div className="flex flex-row justify-start w-full mb-4">
        <Link to="/" className="btn text-slate-900">
          Go back home
        </Link>
      </div>
      <div className={clsx('w-full h-full overflow-auto', {})}>
        <div className=" grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 pb-32 gap-2">
          {catchedPokemonList.map((item, i) => (
            <GridItem key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonCatch

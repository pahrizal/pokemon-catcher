import clsx from 'clsx'
import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CatchedPokemon } from '../pokemon-catch/catch-state'
import { AppState } from '../redux'

const GridItem: FC<CatchedPokemon> = (item) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [catched, setCatched] = useState(false)
  const catchedList = useSelector((state: AppState) => state.catch.catched)

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = (ev) => {}
      imageRef.current.onerror = (ev) => {
        if (imageRef.current)
          imageRef.current.src = 'https://via.placeholder.com/150'
      }
    }
  }, [])

  // check if the pokemon is catched
  useEffect(() => {
    console.log(catchedList)
    if (catchedList && catchedList.length) {
      const pokemon = catchedList.find((p) => p.id === item.id)
      if (pokemon) {
        setCatched(true)
      }
    }
  }, [catchedList, item.id])
  return (
    <Link
      title={catched ? 'You have catched this Pokémon' : ''}
      to={`/pokemon/${item.id}`}
    >
      <div
        className={clsx(
          'relative cursor-pointer overflow-visible mt-6 pb-4 flex flex-col items-center justify-center border-2 border-current shadow-[4px_4px_1px_#475569]',
          'hover:bg-sky-200',
          { 'border-sky-500 bg-sky-200': catched }
        )}
      >
        <div>
          <img
            className="rounded-full w-[80px] h-[80px] border-2 -mt-6 bg-slate-100"
            width={80}
            src={
              item.sprites.front_default || 'https://via.placeholder.com/150'
            }
            alt={item.name}
          />
        </div>
        <div className="w-full px-4 rounded-md flex flex-row items-center text-slate-900">
          <p className=" w-full text-center truncate">{item.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default GridItem

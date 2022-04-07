import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Hero from './components/hero'

import GridItem from './features/pokemon-search/pokemon-item'
import SearchBox from './features/pokemon-search/searchbox'
import { AppState } from './features/redux'

function App() {
  const [animating, setAnimating] = React.useState(false)
  const searching = useSelector((state: AppState) => state.search.searching)
  const query = useSelector((state: AppState) => state.search.query)
  const results = useSelector((state: AppState) => state.search.results)

  // this state used for animate the header to top left
  const [flyToTop, setFlyToTop] = React.useState(false)
  useEffect(() => {
    if (query && results) setFlyToTop(true)
  }, [query, results])

  return (
    <div className="relative flex flex-col h-screen w-screen justify-center items-center overflow-y-hidden">
      <div className="absolute w-fit h-fit flex-col space-y-4">
        <Hero flyToTop={flyToTop} onAnimating={(s) => setAnimating(s)} />
        <SearchBox animate={animating} />
      </div>
      {results.length && !animating && (
        <div className="w-screen h-screen pt-28 px-4">
          <div className="flex flex-row justify-start w-full mb-4">
            <Link to="/catched" className="btn text-slate-900">
              See catched Pokémon
            </Link>
          </div>
          <div
            className={clsx('w-full h-full overflow-auto', {
              'blur-md': searching,
            })}
          >
            <div className=" grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 pb-32 gap-2">
              {results.map((item, i) => (
                <GridItem key={i} {...item} nickname={''} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

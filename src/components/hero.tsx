import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import PokemonBall from './icons/pokemon'

interface Props {
  flyToTop?: boolean
  onAnimating?: (animating: boolean) => void
}
function Hero(props: Props) {
  // for animation
  const headerRef = useRef<HTMLDivElement>(null)
  const sloganRef = useRef<HTMLDivElement>(null)
  const [animating, setAnimating] = useState(false)
  useEffect(() => {
    const header = headerRef.current
    if (headerRef.current && props.flyToTop) {
      setAnimating(true)
      setTimeout(() => {
        header &&
          header.classList.add(
            'flyTopLeft',
            'fixed',
            'top-1/2',
            'left-1/2',
            '-translate-x-1/2',
            '-translate-y-1/2'
          )
        setTimeout(() => setAnimating(false), 1000)
      }, 0)
    } else {
      // remove fly animation class class
      setTimeout(() => {
        sloganRef.current && sloganRef.current.classList.add('animate__fadeIn')
      }, 1000)
    }
  }, [props.flyToTop])

  useEffect(() => {
    props.onAnimating && props.onAnimating(animating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating])

  return (
    <div ref={headerRef} className={clsx('flex flex-col', 'w-fit h-fit')}>
      <div className={clsx('flex flex-col')}>
        <div
          className={clsx(
            'flex flex-row font-bold text-6xl items-center animate__animated animate__bounceInDown'
          )}
        >
          <PokemonBall width={56} />
          <span className="font-fibre text-transparent bg-clip-text pl-2 pt-1 bg-gradient-to-r from-red-500 to-slate-900">{`Pokémon`}</span>
        </div>
        <span
          className={clsx(
            'text-transparent tracking-[8px] animate__animated font-track pt-2 font-bold xl:text-8xl lg:text-8xl md:text-8xl sm:text-6xl text-6xl bg-clip-text bg-gradient-to-r from-orange-500 to-sky-500 mt-2 animate__bounceInUp'
          )}
        >{`Gallery`}</span>
      </div>
    </div>
  )
}

export default Hero

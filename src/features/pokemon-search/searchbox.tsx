import clsx from 'clsx'
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch } from 'react-redux'
import SearchIcon from '../../components/icons/search'
import { searchActions } from './search-state'

interface Props {
  animate?: boolean
}
const SearchBox: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])
  const handleSearch = async () => {
    if (!value) {
      inputRef.current?.focus()
      return
    }
    dispatch(searchActions.searchPokemon(value, 0))
  }
  // set focus to the input
  useEffect(() => {
    inputRef.current?.focus()
    const resizeHandler = () => {
      const windowWidth = window.innerWidth
      const box = boxRef.current
      if (box) {
        if (windowWidth < 600) {
          box.classList.remove('-top-3', 'right-4', 'w-full')
          box.classList.add('top-[40px]', 'left-0', 'w-[96vw]', 'ml-2')
        } else {
          box.classList.remove('top-[40px]', 'left-0', 'w-[96vw]', 'mx-2')
          box.classList.add('-top-3', 'right-4', 'w-full')
        }
      }
    }
    window.addEventListener('resize', resizeHandler)
    resizeHandler()
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  //   // on animate
  useEffect(() => {
    if (props.animate) {
      boxRef.current?.classList.add(
        '-top-3',
        'right-4',
        'opacity-0',
        'fixed',
        'w-full'
      )
      setTimeout(() => {
        boxRef.current?.classList.add('animate__animated', 'animate__fadeIn')
      }, 1000)
    }
  }, [props.animate])
  return (
    <div
      ref={boxRef}
      className={clsx(
        'py-2 px-4 flex flex-row items-center border max-w-[400px] border-slate-900 shadow-[2px_2px_0px_#000]'
      )}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
        onChange={handleChange}
        className="outline-none bg-transparent w-full h-full"
        placeholder="Let's catch some Pokémon! type here..."
      />
      <button onClick={handleSearch} title="Search">
        <SearchIcon />
      </button>
    </div>
  )
}

export default SearchBox

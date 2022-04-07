import React, { FC } from 'react'
import LikeIcon from './icons/like'

const LikeButton: FC<{ count: number }> = ({ count }) => {
  return (
    <button className="text-current hover:text-green-100 text-sm flex flex-row items-center">
      <LikeIcon className="" />
      <p className="pt-1">{count}</p>
    </button>
  )
}

export default LikeButton

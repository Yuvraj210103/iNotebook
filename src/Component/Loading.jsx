import React from 'react'
import loadingGif from './Assets/loading.gif'

const Loading = () => {
  return (
    <div className='flex h-screen w-full justify-center items-center'>
     <img src={loadingGif} alt="" />
    </div>
  )
}

export default Loading
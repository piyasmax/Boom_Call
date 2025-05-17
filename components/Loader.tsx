import Image from 'next/image'
import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../public/icons/Animation.json'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      {/* <Image
      src='/icons/loading-circle.svg'
      alt='loading'
      width={50}
      height={50}
      /> */}
      <div className="w-80 h-80">
        <Lottie animationData={animationData} loop={true}/>
      </div>
    </div>
  )
}

export default Loader
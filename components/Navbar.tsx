import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex fixed justify-between z-50 w-full bg-blue-950 px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-2'>
       <Image 
       src="/icons/logo.svg"
       width={32}
       height={32}
       alt="logo"
       className=' max-sm:size-10'
       />
       <p className=' text-[26px] font-extrabold text-white max-sm:hidden'>Boom</p>

       </Link>

       <div className='flex justify-between gap-4'>
        {/* Clerk -user Management */}
            <SignedIn>
              <UserButton />
            </SignedIn>

        <MobileNav/>

       </div>
    </nav>
  )
}

export default Navbar
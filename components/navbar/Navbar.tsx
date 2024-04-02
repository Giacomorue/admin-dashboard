import React from 'react'
import MainNav from './MainNav'
import Image from 'next/image'
import LogoutBtn from './LogoutBtn'
import Link from 'next/link'
import MobileNav from './MobileNav'
import Container from '../Container'

export default function Navbar() {

  return (
    <>
    <div className='border-b px-4 py-2'>
      <Container>
        <div className='mx-auto flex flex-row items-center relative w-full justify-between'>
          <Link 
            href={"/"}
          >
            <Image 
              src={"/logo.png"}
              alt='Logo'
              height={100}
              width={110}
            />
          </Link>
          <div className='hidden md:block'>
            <MainNav />
          </div>
          
          <div className='hidden md:block'>
            <LogoutBtn />
          </div>
        </div>
      </Container>
    </div>
    <div className='block md:hidden'>
      <MobileNav />
    </div>
    </>
  )
}

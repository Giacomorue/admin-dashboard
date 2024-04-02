"use client"

import React from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className='h-screen w-screen overflow-hidden flex justify-center items-center'>

      <div className='shadow-md p-5 rounded-lg flex flex-col space-y-5 items-center'>
        <Image 
          src={"/logo.png"}
          alt="Logo"
          height={1}
          width={250}
        />
        <h1 className='text-2xl'>
          Pagina Non Trovata
        </h1>
        <Button onClick={() => window.location.assign("/")}>
          Vai alla home
        </Button>
      </div>
    </div>
  )
}

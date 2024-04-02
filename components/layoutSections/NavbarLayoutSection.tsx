"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { Facebook, Instagram, Twitter, X } from 'lucide-react'
import { Page } from '@prisma/client'

export default function NavbarLayoutSection({ navbarPages, active}: {navbarPages: Array<Page>, active: Page}) {
  return (
    <> 
      <div className='mx-auto px-8 xl:px-20 max-w-[1920px]'>
        <div className='mx-auto flex flex-row items-center relative w-full justify-between px-7  h-[60px]'>
          <Image 
            src={"/logo.png"}
            alt='Logo'
            height={100}
            width={110}
          />
          <div className="flex flex-row sm:gap-x-5 gap-x-2">
            {navbarPages?.map((item, index) => {
              const isActive = item.id === active.id;

              return (
                <div 
                  key={index} 
                  className={`${isActive ? "text-red" : "text-lightblack"} group`}
                >
                  <div className="flex-col items-center flex ">
                    <p
                      className={``}
                    >
                      {item?.pageName}
                    </p>
                    <div 
                      className={`h-[1px] ${isActive ? "w-full bg-red" : "w-0 bg-lightblack transition-all ease-linear duration-200"}`}  
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className='hidden md:flex flex-row gap-6'>
            <Instagram />
            <Facebook />
            <Twitter />
          </div>
        </div>
      </div>
      <Separator />
    </>
  )
}

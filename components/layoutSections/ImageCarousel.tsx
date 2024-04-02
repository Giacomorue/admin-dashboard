"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowLeftCircle, ArrowRight, ArrowRightCircle } from 'lucide-react'

interface CarouselProps{
  slides: string[]
  autoPlay?: boolean
  autoPlayTime?: number
  hasBtnPrevAndNext?: boolean
  hasBottomDot?: boolean
  classNameContainer?: string
  classNameSlide?: string
}

export default function ImageCarousel({
  slides, autoPlay, autoPlayTime = 5000, hasBtnPrevAndNext, hasBottomDot, classNameContainer, classNameSlide
}: CarouselProps) {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    setCurr(0);
    if (!autoPlay) return
    if(slides.length === 0) return;
    const slideInterval = setInterval(next, autoPlayTime)
    return () => clearInterval(slideInterval)
  }, [slides.length])

  if(!isMounted){
    return null;
  }

  return(
    <div className={`relative flex-1 aspect-square w-full h-full ${classNameContainer} pb-5 lg:pb-0 group`}>
      <div style={{backgroundImage: `url(${slides[curr]})`}} className={`w-full h-full bg-center bg-cover ${classNameSlide}`}></div>
      {hasBtnPrevAndNext && slides.length > 1 && <ArrowLeft className='absolute top-[50%] -left-4 -translate-x-0 translate-y-[-50%] text-red bg-white rounded-full hover:scale-110 transition duration-150 cursor-pointer p-1 ring-red ring-[2px]' size={30} onClick={prev}/>}
      {hasBtnPrevAndNext && slides.length > 1 && <ArrowRight className='absolute top-[50%] -right-4 -translate-x-0 translate-y-[-50%] text-red bg-white rounded-full hover:scale-110 transition duration-150 cursor-pointer p-1 ring-red ring-[2px]' size={30} onClick={next}/>}
      {hasBottomDot && slides.length > 1 && <div className='flex flex-row items-center justify-center mt-3 gap-3 '>
        {slides.map((_, i) => (
          <div key={i}className={`w-[10px] h-[10px] ${i===curr ? "bg-red" : "bg-gray-500"} rounded-full cursor-pointer transition-all duration-150`} onClick={() => setCurr(i)}/>
        ) )}        
      </div>}
    </div>
  )
}
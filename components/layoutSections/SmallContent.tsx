import React from 'react'
import { Sections } from '@/types'
import ContainerContentLayout from './ContainerContentLayout'
import Image from 'next/image'
import ImageCarousel from './ImageCarousel'
import Button from '../ui/Button'

export default function SmallContent({ section } : { section: Sections}) {

  const textColor = section.dark ? 'text-gray-50' : 'text-lightblack';


  return (
    <ContainerContentLayout dark={section.dark}>
      <div className="p-7 md:py-16">
      <div className='flex justify-center items-center flex-col md:gap-16 gap-3 lg:flex-row'>
          {section.imageLeft && <ImageCarousel
            autoPlay
            hasBottomDot={section.hasBottomDot}
            hasBtnPrevAndNext={section.hasPrevAndNextBtn}
            slides={section?.images?.map((image) => image.imageUrl) || []}
            classNameContainer='max-h-[370px] mt-10 lg:mt-0 mb-10 lg:mb-0'
            classNameSlide='rounded-2xl duration-500'
          />}
          <div className='flex flex-col  flex-1 items-center md:items-start'>
            <h1 className={`${textColor} font-bold lg:text-4xl text-2xl text-center md:text-start mb-5`}>{section.title}</h1>
            <p className={`${textColor} text-sm md:text-base text-center md:text-start mb-7`}>{section.description}</p>
            <div className='w-full flex flex-col md:flex-row gap-5 items-center justify-center md:justify-start my-5'>
              {section.primaryButton && (
                <Button white={section?.dark}>
                  {section.primaryButton}
                </Button>
              )}
              {section.secondaryButton && (
                <Button outline white={section?.dark}>
                  {section.secondaryButton}
                </Button>
              )}
            </div>
          </div>
          {!section.imageLeft && <ImageCarousel
            autoPlay
            hasBottomDot={section.hasBottomDot}
            hasBtnPrevAndNext={section.hasPrevAndNextBtn}
            slides={section?.images?.map((image) => image.imageUrl) || []}
            classNameContainer='max-h-[370px] mt-10 lg:mt-0 mb-10 lg:mb-0'
            classNameSlide='rounded-md duration-500'
          />}
        </div>
      </div>
    </ContainerContentLayout>
  )
}

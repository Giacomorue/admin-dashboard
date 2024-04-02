import React from 'react'
import { Sections } from '@/types'
import ContainerContentLayout from './ContainerContentLayout'
import Image from 'next/image'
import Button from '../ui/Button'
import { Box } from 'lucide-react'
import ImageCarousel from './ImageCarousel'


export default function Content2Info({ section } : { section: Sections}) {

  const textColor = section.dark ? 'text-gray-50' : 'text-lightblack'

  return (
    <ContainerContentLayout dark={section.dark}>
      <div className='p-7 md:py-16'>
        <div className='flex justify-center items-center flex-col md:gap-16 gap-3 lg:flex-row'>
          {section.imageLeft && <ImageCarousel
            autoPlay
            hasBottomDot={section.hasBottomDot}
            hasBtnPrevAndNext={section.hasPrevAndNextBtn}
            slides={section?.images?.map((image) => image.imageUrl) || []}
            classNameContainer='max-h-[500px] mt-10 lg:mt-0 mb-10 lg:mb-0'
            classNameSlide='rounded-md duration-500'
          />}
          <div className='flex flex-col  flex-1 items-center md:items-start'>
            <h1 className={`${textColor} font-bold lg:text-4xl text-2xl text-center md:text-start mb-5`}>{section.title}</h1>
            <p className={`${textColor} text-sm md:text-base text-center md:text-start mb-7`}>{section.description}</p>
            <div className='w-full flex flex-col md:flex-row md:justify-between gap-10 justify-center mb-7'>
              <div className='space-y-2'>
                <Box className={`${textColor} flex flex-row`} />
                <h1 className={`${textColor} font-semibold`}>{section?.explenationInfo?.[0].title}</h1>
                <p className={`${textColor} text-sm`}>{section?.explenationInfo?.[0].description}</p>
              </div>
              <div className='space-y-2'>
                <Box className={`${textColor} flex flex-row`} />
                <h1 className={`${textColor} font-semibold`}>{section?.explenationInfo?.[1].title}</h1>
                <p className={`${textColor} text-sm`}>{section?.explenationInfo?.[1].description}</p>
              </div>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-5 items-center justify-center my-5'>
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
            classNameContainer='max-h-[500px] mt-10 lg:mt-0 mb-10 lg:mb-0'
            classNameSlide='rounded-md duration-500'
          />}
        </div>
      </div>
    </ContainerContentLayout>
  )
}

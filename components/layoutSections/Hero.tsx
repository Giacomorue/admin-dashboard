import { Sections } from '@/types'
import React from 'react'
import Button from '../ui/Button'
import Image from 'next/image'
import Container from '../Container'
import ContainerContentLayout from './ContainerContentLayout'
import ImageCarousel from './ImageCarousel'
import { SwiperSlide } from 'swiper/react'
import Navbar from '../navbar/Navbar'
import { ArrowDown } from 'lucide-react'

export default function Hero({ section } : { section: Sections}) {

  const textColor = section.dark ? 'text-gray-50' : 'text-lightblack'

  return (
    <>
      <div className="h-[calc(100vh-60px)] w-full relative">        
        <ImageCarousel
          autoPlay
          hasBottomDot={section.hasBottomDot}
          hasBtnPrevAndNext={section.hasPrevAndNextBtn}
          slides={section?.images?.map((image) => image.imageUrl) || []}
          classNameContainer='absolute inset-0 top-0 w-full'
          classNameSlide='duration-500'
          autoPlayTime={10000}
        />
        <div className="z-10 absolute max-w-[800px] bottom-20 mx-10 bg-white p-5 rounded-xl bg-opacity-[75%]">
          <div className='flex flex-col gap-10 items-center md:items-start'>
            <h1 className={`text-lightblack font-bold xl:text-7xl lg:text-5xl text-4xl text-center md:text-start`}>{section.title}</h1>
            <p className={`text-lightblack text-sm md:text-lg text-center md:text-start`}>{section.description}</p>
            <div className='flex flex-col md:flex-row gap-5 items-center '>
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
          
        </div>
      </div>
    </>



//     <ContainerContentLayout dark={section.dark}>
//   <div className="h-[calc(100vh-60px)] w-full">
//     <div className='h-full w-full flex justify-center items-center flex-col lg:flex-row gap-20'>
//     {section.imageLeft && <ImageCarousel
//         autoPlay
//         hasBottomDot={section.hasBottomDot}
//         hasBtnPrevAndNext={section.hasPrevAndNextBtn}
//         slides={section?.images?.map((image) => image.imageUrl) || []}
//         classNameContainer='max-h-[600px] mt-10 lg:mt-0 mb-10 lg:mb-0'
//         classNameSlide='rounded-md duration-500'
//       />}

//       <div className='flex flex-col gap-10 items-center md:items-start pb-0 mb-0 flex-1'>
//         <h1 className={`${textColor} font-bold xl:text-7xl lg:text-5xl text-4xl text-center md:text-start`}>{section.title}</h1>
//         <p className={`${textColor} text-sm md:text-lg text-center md:text-start`}>{section.description}</p>
//         <div className='flex flex-col md:flex-row gap-5 items-center '>
//           {section.primaryButton && (
//             <Button white={section?.dark}>
//               {section.primaryButton}
//             </Button>
//           )}
//           {section.secondaryButton && (
//             <Button outline white={section?.dark}>
//               {section.secondaryButton}
//             </Button>
//           )}
//         </div>
//       </div>
      
//       {!section.imageLeft && <ImageCarousel
//         autoPlay
//         hasBottomDot={section.hasBottomDot}
//         hasBtnPrevAndNext={section.hasPrevAndNextBtn}
//         slides={section?.images?.map((image) => image.imageUrl) || []}
//         classNameContainer='max-h-[700px] mt-10 lg:mt-0 mb-10 lg:mb-0 w-full flex-1'
//         classNameSlide='rounded-md duration-500'
//       />}
//     </div>
//   </div>
// </ContainerContentLayout>
  )
}


{/* <ContainerContentLayout dark={section.dark}>
  <div className="h-[calc(100vh-60px)] w-full">
    <div className='h-full w-full flex justify-center items-center flex-col lg:flex-row'>
    {section.imageLeft && <ImageCarousel
        autoPlay
        hasBottomDot={section.hasBottomDot}
        hasBtnPrevAndNext={section.hasPrevAndNextBtn}
        slides={section?.images?.map((image) => image.imageUrl) || []}
        classNameContainer='max-h-[600px] mt-10 lg:mt-0 mb-10 lg:mb-0'
        classNameSlide='rounded-md duration-500'
      />}

      <div className='flex flex-col gap-10 items-center md:items-start pb-0 mb-0 flex-1'>
        <h1 className={`${textColor} font-bold xl:text-7xl lg:text-5xl text-4xl text-center md:text-start`}>{section.title}</h1>
        <p className={`${textColor} text-sm md:text-lg text-center md:text-start`}>{section.description}</p>
        <div className='flex flex-col md:flex-row gap-5 items-center '>
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
        classNameContainer='max-h-[700px] mt-10 lg:mt-0 mb-10 lg:mb-0 w-full flex-1'
        classNameSlide='rounded-md duration-500'
      />}
    </div>
  </div>
</ContainerContentLayout> */}


{/*  */}
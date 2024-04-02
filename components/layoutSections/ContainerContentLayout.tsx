import React from 'react'

export default function ContainerContentLayout({children, dark}: {children: React.ReactNode, dark?: boolean}) {

  return (
    <div className={`${dark ? "bg-lightblack": "bg-white"} `}>
      <div className='mx-auto px-8 xl:px-20 max-w-[1920px]' > 
      {/* Or padding or max-w-[1440px] or max-w-[1600px] or max-w-[1920px]*/}
        {children}
      </div>
    </div>
  )
}

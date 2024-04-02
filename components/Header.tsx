"use client"

import React from 'react'
import { Separator } from './ui/separator';
import Container from './Container';

interface HeaderProps{
  title: string;
  description?: string;
  children?: React.ReactNode
  small?: boolean
}

export default function Header({
  title, description, children, small
}: HeaderProps) {
  return (
    <div className='w-full'>
      <Container className='space-y-4'>
        <div className='flex flex-row items-center justify-between'>
          <div className='space-y-2'>
            <h1 className={`${small ? "text-2xl" : "text-4xl"} font-semibold text-lightblack`}>{title}</h1>
            <p className={`${small ? "text-sm" : "text-md"} text-neutral-600`}>{description}</p>
          </div>
          {children}
        </div>
        <Separator />
      </Container>
    </div>
  )
}

import React from 'react'
import ImageClient from './components/ImageClient'
import prismadb from '@/lib/prismadb'
import { Image } from '@prisma/client'

export type ImageFormatted = {
  id: string;
  imageUrl: string;
}

export default async function ImmaginiPage() {

  const images = await prismadb.image.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <>
      <ImageClient images={images} />
    </>
  )
}

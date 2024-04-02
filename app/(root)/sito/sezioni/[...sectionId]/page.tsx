import React from 'react'
import SectionClient from './components/SectionClient'
import prismadb from '@/lib/prismadb'
import { Image } from '@prisma/client';

export default async function SectionPage({params: {sectionId} } : {params: {sectionId: string}}) {

  if(sectionId[0] === undefined){
    return null;
  }

  const allImages = await prismadb.image.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  const section = sectionId[0] !== null && sectionId[0] !== undefined && sectionId[0] !== "new" ? 
    await prismadb.section.findFirst({
      where: {
        id: sectionId[0]
      } 
    }) 
    : null;


  const images = sectionId[0] !== null && sectionId[0] !== undefined && sectionId[0] !== "new" ? 
    await prismadb.image.findMany({
      where: { id: { in: section?.images } }
   })
   : null;

  return (
    <SectionClient allImages={allImages} section={section} sectionImages={images}/>
  )
}

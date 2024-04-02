import React from 'react'
import PageClient from './components/PageClient'
import prismadb from '@/lib/prismadb'
import { Sections } from '@/types';
import { Image } from '@prisma/client';

export default async function SitoPage({params: {pageId}} : { params: {pageId: string}}) {

  const avableSections = await prismadb.section.findMany({});

  const defaultPage = await prismadb.page.findFirst({
    where:{
      defaultPage: true,
    }
  });

  const images = await prismadb.image.findMany({});

  const thereIsdefaultPage = defaultPage?.id ? (defaultPage.id === pageId[0] ? false : true) : false;

  //@ts-ignore
  const sections: Sections[] = avableSections.map((section) => ({
    id: section.id,
    pageType: section.pageType,
    name: section.name,
    title: section.title,
    description: section.description || undefined, 
    primaryButton: section.primaryButton || undefined,
    primaryButtonLinkPage: section.primaryButtonLinkPage || undefined,
    secondaryButton: section.secondaryButton || undefined,
    secondaryButtonLinkPage: section.secondaryButtonLinkPage || undefined,
    dark: section.dark || undefined,
    imageLeft: section.imageLeft || undefined,
    explenationInfo: section.explenationInfo || undefined,
    reviews:section.reviews || undefined,

    hasBottomDot: section.hasBottomDot || undefined,
    hasPrevAndNextBtn: section.hasPrevAndNextBtn || undefined,

    images: [...section.images.map((imageId) => images.find((image) => image.id === imageId))],
  }));

  const pages = await prismadb.page.findMany({
    where: {
      visiblePage: true,
    },
    orderBy: {
      navbarOrder: "asc"
    }
  });

  const completeNavbarPages = pages.filter((page) => page.id !== pageId[0]);

  const navbarPages: Array<{id: String, name: String, order: Number}> | null 
  = completeNavbarPages.length > 0 
  ? completeNavbarPages.map((page) => { return {id: page.id, name: page.pageName, order: page.navbarOrder}}) 
  : null;

  const selectDataSection: Array<{name: string, value: string}> = avableSections.map((section) => ({
    name: section.name + " - " + section.pageType,
    value: section.id 
  }))

  const page = pageId[0] !== null && pageId[0] !== undefined && pageId[0] !== "new" ? 
    await prismadb.page.findFirst({
      where: {
        id: pageId[0]
      } 
    }) 
    : null;

  return (
    <PageClient 
      avableSections={sections}
      thereIsdefaultPage={thereIsdefaultPage}
      selectDataSection={selectDataSection}
      page={page}
      navbarPages={navbarPages}
    />
  )
}

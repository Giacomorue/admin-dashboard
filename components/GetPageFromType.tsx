import { Sections } from '@/types'
import React from 'react'

import {CarouselReview, CTA, ContactForm, Content, Content2Info, FAQ, Gallery, Hero, MapContact, SmallContent, SmallImage, TreInfo, TreReview} from "@/components/layoutSections"

export default function GetPageFromType({
  section, pageType
}: {section: Sections, pageType: string}) {
  
  if(pageType === "Hero"){
    return <Hero section={section}/>
  } 
  
  if(pageType === "Content2Info"){
    return <Content2Info section={section}/>
  } 
  
  if(pageType === "SmallContent"){
    return <SmallContent section={section} />
  } 

}

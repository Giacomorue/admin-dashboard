import { Image, PageSection } from "@prisma/client"

export type Sections = {
  id?: string;
  pageType: string
  name: string,
  title: string
  description?: string 
  primaryButton?: string
  primaryButtonLinkPage?: string
  secondaryButton?: string
  secondaryButtonLinkPage?: string
  dark?: boolean
  imageLeft?: boolean
  explenationInfo?: ExplenationInfo[]
  reviews?: Review[]

  hasBottomDot?: boolean
  hasPrevAndNextBtn?: boolean

  images?: Image[]
}

export type SectionColumType = {
  id: string
  pageType: string
  name: string
}

export type PageColumType = {
  id: string,
  pageName: string,
  link: string,
  defaultPage: boolean,
  navbarOrder: number,
  visiblePage: boolean,
}
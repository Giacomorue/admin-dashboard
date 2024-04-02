import SitoClient from "./components/SitoClient";
import prismadb from "@/lib/prismadb";
import { PageColumType, SectionColumType } from "@/types";
import { Sections } from "@/types";


export default async function SitoPage() {

  const avableSections = await prismadb.section.findMany({});

  prismadb.section.findMany

  const images = await prismadb.image.findMany({});

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

  const sectionsFormatted: SectionColumType[] = avableSections.map((section) => ({
    id: section.id,
    pageType: section.pageType,
    name: section.name
  }));

  const pages = await prismadb.page.findMany({
    orderBy: {
      navbarOrder: "asc"
    }
  });

  const formattedPages: PageColumType[] = pages.map((page) => ({
    id: page.id,
    pageName: page.pageName,
    link: page.link,
    defaultPage: page.defaultPage,
    navbarOrder: page.navbarOrder,
    visiblePage: page.visiblePage,
  }));

  return (
    <>
      <SitoClient pages={pages} sectionTable={sectionsFormatted} pagesTable={formattedPages} avableSections={sections} />
    </>
  )
}

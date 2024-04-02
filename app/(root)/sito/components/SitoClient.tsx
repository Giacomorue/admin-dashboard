"use client"

import Header from '@/components/Header'
import Button from '@/components/ui/Button'
import { Edit, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { PageColumType, SectionColumType, Sections } from "@/types"
import { DataTable } from '@/components/DataTable'
import { PageColumn, SectionColumn } from './Columns'
import Container from '@/components/Container'
import { Page } from '@prisma/client'
import NavbarLayoutSection from '@/components/layoutSections/NavbarLayoutSection'
import GetPageFromType from '@/components/GetPageFromType'

export default function SitoClient({
  sectionTable, pagesTable, pages, avableSections
}: {sectionTable: SectionColumType[], pagesTable: PageColumType[], pages: Page[], avableSections: Sections[]}) {

  const router = useRouter();

  return (
    <>
      <div className='p-5'>
        <Header 
          title={`Pagine Sito`}
          description={`Gestisci tutte le pagine del sito`}
        >
          <Button
            className='flex flex-row gap-2'
            onClick={() => router.push("/sito/pagine/new")}
          >
            <Plus /> Pagina
          </Button>
        </Header>
        <Container className='pb-10'>
          <div className='mt-10'>
            <DataTable columns={PageColumn} data={pagesTable} />
          </div>
        </Container>


        <Header 
          title={`Sezioni Sito`}
          description={`Gestisci tutte le sezioni del sito`}
        >
          <Button
            className='flex flex-row gap-2'
            onClick={() => router.push("/sito/sezioni/new")}
          >
            <Plus /> Sezione
          </Button>
        </Header>
        <Container>
          <div className='mt-10'>
            <DataTable columns={SectionColumn} data={sectionTable} />
          </div>
        </Container>
      </div>


      <div className='space-y-10 pt-6'>
        {pages?.map((page) => (
          <div key={page.id} className='py-6'>
            <Header 
              title={`Preview pagina ${page.pageName}`}
              description={`Visualizza la preview della pagina ${page.pageName}`}
              small
            >
              <Button outline onClick={() => router.push(`/sito/pagine/${page.id}`)}>
                <Edit />
              </Button>
            </Header>
            <div className='py-1 border-y-[1px] border-lightblack mt-5'>
              <NavbarLayoutSection 
                navbarPages={pages}
                active={page}
              />
              {page?.sections?.map((section,i) => {
                const page = avableSections.find((avableSection) => avableSection.id === section);

                if(!page)
                  return null;
      
                return (
                  <div key={i}>
                    <GetPageFromType section={page} pageType={page?.pageType} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

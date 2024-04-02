"use client"

import Container from '@/components/Container';
import Header from '@/components/Header'
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input'
import SelectComponent from '@/components/ui/SelectComponent';
import TextArea from '@/components/ui/TextArea';
import { Separator } from '@/components/ui/separator';
import { PageType } from '@/constant';
import { ExplenationInfo, Image, Page, Review } from '@prisma/client';
import { Check, Divide, Edit, Edit2, Menu, Minus, Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Sections } from '@/types';
import Checkbox from '@/components/ui/Checkbox';
import axios from 'axios';
import toast from 'react-hot-toast';

import {CarouselReview, CTA, ContactForm, Content, Content2Info, FAQ, Gallery, Hero, MapContact, SmallContent, SmallImage, TreInfo, TreReview} from "@/components/layoutSections"
import { useRouter } from 'next/navigation';
import DeleteSomething from '@/components/modals/DeleteSomething';
import NavbarLayoutSection from '@/components/layoutSections/NavbarLayoutSection';
import GetPageFromType from '@/components/GetPageFromType';

export default function PageClient({
  avableSections, thereIsdefaultPage, selectDataSection, page,
}: {
  avableSections: Sections[],       
  thereIsdefaultPage: Boolean, 
  selectDataSection: Array<{name: string, value: string}>, page?: Page | null, 
  navbarPages?: Array<{id: String, name: String, order: Number}> | null
}) {

  const router = useRouter();

  const [pageName, setPageName] = useState<string | undefined>(page?.pageName || "");
  const [link, setLink] = useState(page?.link || "");
  const [isLoading, setIsLoading] = useState(false);

  const [defaultPage, setDefaultPage] = useState<boolean>(page?.defaultPage || !thereIsdefaultPage  || false);
  const [visiblePage, setVisiblePage] = useState<boolean>(page?.visiblePage || !thereIsdefaultPage); 
  
  const [navbarOrder, setNavbarOrder] = useState<Number>(page?.navbarOrder || 1) 

  const [sections, setSections] = useState<Array<string>>(page?.sections || []);

  const [isOpen, setIsOpen] = useState(false);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length <= 0){
      setPageName("");
      setLink("");
      return;
    }
    
    setPageName((e.target.value.at(0)?.toUpperCase() + e.target.value.slice(1)).trim());

    setLink("/"+e.target.value.toLowerCase().trim());
  }

  const onAddSection = () => {
    setSections((prev) => [...prev, ""]);
  }

  const onRemoveSection = () => {
    setSections((prev) => prev.slice(0, -1));
  }

  const onChangeSelect = (index: number, value: string) => {
    const data = [...sections];
    data[index] = value;
    setSections(data);
  }

  const onUpload = async () => {
    if(!pageName){
      toast.error("Inserisci il nome");
      return;
    }

    if(!navbarOrder ){
      toast.error("Inserisci numero di ordine della pagina (minimo 1)");
      return;
    }

    setIsLoading(true);

    const url = page?.id ? `/api/pages/${page.id}` : "/api/pages";
    try{
      const res = await axios.post(url, {
        pageName,
        link,
        navbarOrder,
        defaultPage,
        visiblePage,
        sections
      });

      console.log(res);
      router.push("/sito");
      router.refresh();
      toast.success(page?.id ? "Modificata con successo" :"Caricata con successo");
    } catch(err){
      console.log(err);
      toast.error(page?.id ? "Errore nel modificare la pagina, compila tutti i dati e controlla che il link non sia già in uso o che esista una default page" : "Errore nel caricamento della pagina, compila tutti i deati e controlal che il link non sia già in uso");
    }

    setIsLoading(false)
  }

  const onDelete = async () =>{
    try{
      setIsLoading(true);
      const response = await axios.delete(`/api/pages/${page?.id}`);
      console.log(response);
      router.push("/sito");
      router.refresh();
      toast.success("Pagina eliminata");
    } catch(err){
      console.log(err);
      toast.error("Errore nella rimozione della pagina, controlla di non eliminare la pagina di default (impostanen un'altra prima)");
    } finally{
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  const [dragItemIndex, setDragItemIndex] = useState<number>(-1);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>(-1);

  const handleDrop = () => {
    if(dragOverItemIndex === -1){
      setDragItemIndex(-1);
      return;
    }

    const _sections = [...sections];
    const dragItem = _sections.splice(dragItemIndex, 1)[0];
    _sections.splice(dragOverItemIndex, 0, dragItem);
    setSections(_sections);
    setDragItemIndex(-1);
  }

  return (
    <>
      <DeleteSomething 
        isOpen={isOpen}
        onDelete={onDelete}
        closeModal={() => setIsOpen(false)}
        disabled={isLoading}
      />
      <Container className='p-5'>
        <Header 
          title={page?.id ? 'Modifica la pagina' : 'Crea una nuova pagina'}
          description={page?.id ? 'Modifica la  pagina scegliendo tutte le sezioni (Navbar e Footer non sono inclusi)' : 'Crea una nuova pagina inserendo tutte le sezioni (Navbar e Footer non sono inclusi)'}
        >
          <div className='flex flex-row gap-2'>
            <Button disabled={isLoading} onClick={onUpload} className='flex flex-row gap-2' big>
              <Check /> {page?.id ? "Salva" : "Carica"}
            </Button>
            {page?.id && <Button disabled={isLoading} onClick={() => setIsOpen(true)} outline >
              <Trash /> 
            </Button>}
          </div>
        </Header>
        <div className='pt-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <Input 
              label='Nome'
              onChange={onChangeName}
              value={pageName}
              disabled={isLoading}
            />
          </div>
          <div>
            <Input 
              label='Link'
              disabled={true}
              onChange={(e) => {}}
              value={link}
            />
          </div>
          <div>
            <Input 
              label='Numero ordine navbar'
              disabled={isLoading}
              onChange={(e) => setNavbarOrder(Number(e.target.value))}
              value={String(navbarOrder)}
              type='number'
            />
          </div>
        </div>
        <div className='pt-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Checkbox 
            title='Pagina predefinita'
            description='Indica se questa è la pagina home del sito'
            disabled={isLoading || !thereIsdefaultPage ? true : false}
            checked={defaultPage}
            onChange={(e) => setDefaultPage(e.target.checked)}
          />
          <Checkbox 
            title='Pagina visualizzabile'
            description='Indica se la pagina è visibile allinterno del sito'
            disabled={isLoading || !thereIsdefaultPage ? true : false}
            checked={visiblePage }
            onChange={(e) => setVisiblePage(Boolean(e.target.checked))}
          />
        </div>

        <div className='py-8'>
          <Header 
            title='Sezioni'
            description='Sezioni inserienti alla pagina'
            small
          >
            <div className='flex flex-row gap-2'>
              <Button
                outline
                className='flex flex-row gap-2'
                disabled={isLoading}
                onClick={onAddSection}
              >
                <Plus />Sezione
              </Button>
              <Button
                outline
                className='flex flex-row gap-2'
                disabled={isLoading || sections.length <= 1} 
                onClick={onRemoveSection}
              >
                <Minus /> Sezione
              </Button>
            </div>
          </Header>
        </div>

        <div className='px-3 space-y-4'>
          {sections.map((section, index) => (
            <div 
              key={index} 
              className='p-4 bg-gray-100 rounded-lg flex flex-row gap-5 items-center cursor-move' 
              draggable
              onDragOver={(e) => e.preventDefault()}
              onDragStart={() => setDragItemIndex(index)}
              onDragEnter={() => setDragOverItemIndex(index)}
              onDragEnd={handleDrop}
            >
              <Menu />
              <SelectComponent
                value={section}
                data={selectDataSection}
                disabled={isLoading}
                onChange={(e) => onChangeSelect(index, e)}
                label='Scegli la sezione'
              />
              <Button onClick={() => router.push(`/sito/sezioni/${section}`)} className='flex flex-row gap-3'>
                <Edit2 /> Sezione
              </Button>
            </div>
          ))}
        </div>

        <div className='py-8'>
          <Header 
            title='Preview'
            description='Visualizza la preview della pagina'
            small
          />
        </div>
      </Container>
      <div className='py-5'>
        {sections.map((section, i) => {
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
    </>
  )
}

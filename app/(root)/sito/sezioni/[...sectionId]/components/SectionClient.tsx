"use client"

import React, { useState } from 'react'

import { Sections } from '@/types'
import Header from '@/components/Header'
import SelectComponent from '@/components/ui/SelectComponent'
import { PageType as PageTypeData } from '@/constant'
import Container from '@/components/Container'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'
import { Check, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { ExplenationInfo, Image as ImageType, Review, Section } from '@prisma/client'
import SelectImagesModal from '@/components/modals/SelectImagesModal'
import { useSelectImageModal } from '@/hooks/useSelectImageModal'
import UploadImageModal from '@/components/modals/UploadImageModal'
import { useImageUploader } from '@/hooks/useImageUploader'

import {CarouselReview, CTA, ContactForm, Content, Content2Info, FAQ, Gallery, Hero, MapContact, SmallContent, SmallImage, TreInfo, TreReview} from "@/components/layoutSections"

import Navbar from '@/components/navbar/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import DeleteSomething from '@/components/modals/DeleteSomething'
import { useDeleteSomething } from '@/hooks/useDeleteSomething'
import GetPageFromType from '@/components/GetPageFromType'

export default function SectionClient({allImages, section, sectionImages } : {allImages: ImageType[], section: Section | null, sectionImages: ImageType[] | null}) {

  const router = useRouter();
  const selectImageModal = useSelectImageModal();
  const imageUploader = useImageUploader();

  const deleteSomethingModal = useDeleteSomething();

  const [isLoading, setIsLoading] = useState(false);
  const [pageType, setPageType] = useState(section?.pageType || "");
  const [name, setName] = useState(section?.name || "");
  const [title, setTitle] = useState(section?.title || "");
  const [description, setDescription] = useState(section?.description || "");
  const [primaryButton, setPrimaryButton] = useState(section?.primaryButton || "");
  const [primaryButtonLink, setPrimaryButtonLink] = useState(section?.primaryButtonLinkPage || "");
  const [secondaryButton, setSecondaryButton] = useState(section?.secondaryButton || "");
  const [secondaryButtonLink, setSecondaryButtonLink] = useState(section?.secondaryButtonLinkPage || "");

  const [dark, setDark] = useState<boolean>(section?.dark || false);
  const [imageLeft, setImageLeft] = useState<boolean>(section?.imageLeft || false);
  const [hasBottomDot, setHasBottomDot] = useState<boolean>(section?.hasBottomDot || false);
  const [hasPrevAndNextBtn, seHasPrevAndNextBtn] = useState<boolean>(section?.hasPrevAndNextBtn || false);

  const [reviews, setReviews] = useState<Array<Review>>(section?.reviews || [
    {name: "", review: "", value: 0, image: ""},
    {name: "", review: "", value: 0, image: ""},
    {name: "", review: "", value: 0, image: ""},
  ]);

  const [explenationsInfo, setExplenationsInfo] = useState<Array<ExplenationInfo>>(section?.explenationInfo || [
    {title: "", description: ""},
    {title: "", description: ""},
  ]);

  const [images, setImages] = useState<Array<ImageType>>(sectionImages || []);

  const upload = async () => {
    if(!name){
      toast.error("Inserisci il nome");
      return;
    }

    if(!pageType){
      toast.error("Seleziona il tipo della pagina");
      return;
    }

    const url = section?.name ? `/api/sections/${section.id}` : "/api/sections";
    try{
      const res = await axios.post(url, {
        pageType,
        name,
        title, 
        description, 
        primaryButton, 
        primaryButtonLinkPage: primaryButtonLink, 
        secondaryButton, 
        secondaryButtonLinkPage: secondaryButtonLink, 
        dark, 
        imageLeft, 
        explenationInfo: explenationsInfo, 
        reviews, 
        hasBottomDot, 
        hasPrevAndNextBtn,  
        images
      })
      console.log(res);
      router.push("/sito");
      router.refresh();
      toast.success(section?.name ? "Modifiche salvate": "Caricata con successo");
    } catch(err){
      console.log(err);
      toast.error(section?.name ? "Errore nel modificare": "Errore nel caricamento");
    }
  }

  const changePageType = (value: string) => {
    setPageType(value);

    if(value === "Content2Info"){
      setExplenationsInfo([{title: "", description: ""},
      {title: "", description: ""},]);
    }
    else if(value === "TreInfo"){
      setExplenationsInfo([{title: "", description: ""},
      {title: "", description: ""}, {title: "", description: ""}]);
    }
    else if(value === "FAQ"){
      setExplenationsInfo([{title: "", description: ""},
      {title: "", description: ""}, {title: "", description: ""}, {title: "", description: ""}, {title: "", description: ""}]);
    }

  }

  const addImage = (image: ImageType) => {
    setImages((prev) => [...prev, image]);
  }
  
  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  const changeReviewName = (index: number, value: string) => {
    console.log(index, value);
    const prevReviews = [...reviews];
    prevReviews[index].name = value;
    setReviews((prev) => prev = prevReviews);
  }

  const changeReviewReview = (index: number, value: string) => {
    const prevReviews = [...reviews];
    prevReviews[index].review = value;
    setReviews((prev) => prev = prevReviews);
  }

  const changeReviewValue = (index: number, value: number) => {
    if(value < 0 || value > 5){
      return;
    }
    const prevReviews = [...reviews];
    prevReviews[index].value = value;
    setReviews((prev) => prev = prevReviews);
  }

  const changeExplenationInfoTitle = (index: number, title: string) => {
    const prevInfo = [...explenationsInfo];
    prevInfo[index].title = title;
    setExplenationsInfo((prev) => prev = prevInfo);
  }

  const changeExplenationInfoDescription = (index: number, description: string) => {
    const prevInfo = [...explenationsInfo];
    prevInfo[index].description = description;
    setExplenationsInfo((prev) => prev = prevInfo);
  }

  const onDelete = async () =>{
    try{
      setIsLoading(true);
      const response = await axios.delete(`/api/sections/${section?.id}`);
      console.log(response);
      router.push("/sito");
      router.refresh();
      toast.success("Sezione eliminata");
    } catch(err){
      console.log(err);
      toast.error("Rimuovi la sezione da tutte le pagine prima");
    } finally{
      setIsLoading(false);
    }
  }

  return (
    <>
      <DeleteSomething 
        isOpen={deleteSomethingModal.isOpen}
        onDelete={onDelete}
        closeModal={deleteSomethingModal.onClose}
        disabled={isLoading}
      />
      <UploadImageModal
        isOpen={imageUploader.isOpen}
        onClose={() => {
          imageUploader.onClose();
          selectImageModal.onOpen();
        }}
      />
      <SelectImagesModal 
        isOpen={selectImageModal.isOpen}
        onClose={selectImageModal.onClose}
        allImages={allImages}
        selectedImages={images}
        addImage={addImage}
        removeImage={removeImage}
      />
      <Container className='py-4 px-6 space-y-12'>
        <Header 
          title='Sezione'
          description='Compila i dati per vedere in anteprima la sezione del sito'
        >
          <div className='flex flex-row gap-2'>
            <Button disabled={isLoading} onClick={upload} className='flex flex-row gap-2' big>
              <Check /> {section?.name ? "Salva" : "Carica"}
            </Button>
            {section?.name && <Button disabled={isLoading} onClick={() => deleteSomethingModal.onOpen()} outline >
              <Trash /> 
            </Button>}
          </div>
        </Header>

        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Pagina name */}
          <SelectComponent 
            data={PageTypeData}
            value={pageType}
            label='Tipologia Sezione'
            onChange={(e) => changePageType(e)}
            disabled={isLoading}
          />

          {/* Nome */}
          <Input 
            label='Nome'
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
          />

          {/* Titolo */}
          <div className='col-span-1 md:col-span-2 lg:col-span-3'>
            <Input 
              label='Titolo'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              disabled={isLoading}
            />
          </div>

          {/* Descrizione */}
          <div className='col-span-1 md:col-span-2 lg:col-span-3'>
            <TextArea 
              label='Descrizione'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              disabled={isLoading}
            />
          </div>

          {/* Bottone Primario */}
          <div className='col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Input 
              label='Testo Bottone Primario'
              onChange={(e) => setPrimaryButton(e.target.value)}
              value={primaryButton}
              disabled={isLoading}
            />
            <SelectComponent 
              data={[]}
              label='Link Pagina'
              value={primaryButtonLink}
              onChange={(e) => setPrimaryButtonLink(e)}
              disabled={isLoading}
            />
          </div>
          
          {/* Bottone Secondario */}
          <div className='col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Input 
              label='Testo Bottone Secondario'
              onChange={(e) => setSecondaryButton(e.target.value)}
              disabled={isLoading}
              value={secondaryButton}
            />
            <SelectComponent 
              data={[]}
              label='Link Pagina'
              onChange={(e) => setSecondaryButtonLink(e)}
              disabled={isLoading}
              value={secondaryButtonLink}
            />
          </div>

          <div className='col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Dark */}
            <Checkbox 
              onChange={(e) => setDark(e.target.checked)}
              checked={dark}
              title='Scuro'
              description='Seleziona per impostare lo sfondo nero'
              disabled={isLoading}
            />
            {/* Immagine a sinistra */}
            <Checkbox 
              onChange={(e) => setImageLeft(e.target.checked)}
              checked={imageLeft}
              title='Immagini/e a Sinistra'
              description='Seleziona per impostare l&apos;immagine/i a sinistra'
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Recensioni */}
        {(pageType === "TreReview" || pageType === "CarouselReview") && <div className='space-y-5'>
          <Header 
            title="Recensioni"
            description='Inserisci le recensioni dei clienti'
            small
          />

          <div className='space-y-5'>
            {reviews.map((review, index) => (
              <div key={index} className='grid grid-cols-1  md:grid-cols-4 gap-8'>
                <Input 
                  label='Nome per recensione'
                  onChange={(e) => changeReviewName(index, e.target.value)}
                  disabled={isLoading}
                  value={review.name}
                />
                <div className='md:col-span-2'>
                  <Input 
                    label='Nome per recensione'
                    onChange={(e) => changeReviewReview(index, e.target.value)}
                    disabled={isLoading}
                    value={review.review}
                  />
                </div>
                <Input 
                  label='Stelle'
                  onChange={(e) => changeReviewValue(index, Number(e.target.value))}
                  disabled={isLoading}
                  value={String(review.value)}
                  type='number'
                />
              </div>
            ))}
          </div>
        </div>}
        
        {/* Info */}
        {(pageType === "Content2Info" || pageType === "TreInfo" || pageType === "FAQ") && <div className='space-y-5'>
          <Header 
            title="Info"
            description='Inserisci le varie info'
            small
          />

          <div className='space-y-5'>
            {explenationsInfo.map((info, index) => (
              <div key={index} className='grid grid-cols-1  md:grid-cols-3 gap-8'>
                <Input 
                  label='Titolo info'
                  onChange={(e) => changeExplenationInfoTitle(index, e.target.value)}
                  disabled={isLoading}
                  value={info.title}
                />
                <div className='col-span-2'>
                  <TextArea 
                    label='Descrizione info'
                    onChange={(e) => changeExplenationInfoDescription(index, e.target.value)}
                    disabled={isLoading}
                    value={info.description}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Images */}
        <div>
          <div className='col-span-1 md:col-span-2 lg:col-span-3'>
            <Header 
              title='Immagine/i'
              description='Seleziona l&apos;immagine/i della sezione'
              small
            >
              <Button disabled={isLoading} className='flex flex-row gap-2' onClick={selectImageModal.onOpen}>
                <Plus /> Immagini
              </Button>
            </Header>
          </div>

          <div className='py-5 justify-start flex flex-row flex-wrap gap-8'>
            {images?.map((image) => (
              <div
                key={image.id}
                className='relative md:w-[250px] md:h-[250px] w-[150px] h-[150px] rounded-md group cursor-pointer'
              >
                <Button
                  className="hidden group-hover:flex absolute z-10 right-0 w-full h-full items-center justify-center"
                  onClick={() => removeImage(image.id)}
                  disabled={isLoading}
                >
                  <Trash size={25} />
                </Button>
                <Image 
                  src={image.imageUrl}
                  alt={image.id}
                  fill     
                  className="object-contain rounded-md"         
                />
              </div>
            ))}
          </div>
          {images.length > 1 && <div className='col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Dark */}
            <Checkbox 
              onChange={(e) => setHasBottomDot(e.target.checked)}
              checked={hasBottomDot}
              title='Indicatori slide'
              description='Seleziona attivare gli indicatori delle slide sotto'
              disabled={isLoading}
            />
            {/* Immagine a sinistra */}
            <Checkbox 
              onChange={(e) => seHasPrevAndNextBtn(e.target.checked)}
              checked={hasPrevAndNextBtn}
              title='Bottoni cambia slide'
              description='Seleziona per attivare i bottoni per cambiare slide'
              disabled={isLoading}
            />
          </div>}
        </div>
        
        <Header 
          title='Preview'
          description='Anteprima della sezione'
        />
      </Container>
      
      <div className=''>
        <GetPageFromType 
          section={{
            name, 
            title, 
            description, 
            primaryButton, 
            primaryButtonLinkPage: primaryButtonLink,
            secondaryButton, 
            secondaryButtonLinkPage: secondaryButtonLink, 
            images, 
            imageLeft, 
            dark, 
            pageType, 
            explenationInfo: explenationsInfo, 
            reviews, 
            hasBottomDot, 
            hasPrevAndNextBtn
          }} 
          pageType={pageType}/>
      </div>
      <div className='p-3'/>
    </>
  )
}

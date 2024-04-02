"use client"

import React from 'react'
import Modal from '../Modal'
import { Image as ImageType } from '@prisma/client';
import Button from '../ui/Button';
import Image from 'next/image'
import { Check, Plus, Trash, Upload } from 'lucide-react';
import { useImageUploader } from '@/hooks/useImageUploader';

interface SelectImagesModalProps{
  isOpen: boolean
  onClose?: () => void
  allImages: ImageType[]
  selectedImages: ImageType[]
  addImage: (image: ImageType) => void
  removeImage: (id: string) => void
}

export default function SelectImagesModal({
  isOpen, onClose, allImages, selectedImages, addImage, removeImage
}: SelectImagesModalProps) {

  const uploadImageModal = useImageUploader();

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      title='Seleziona immagini'
      description='Seleziona tutte le immagini da usare nella sezione'
    >
      <div className='flex flex-col items-center justify-center'>
        <div className='h-[300px] overflow-x-hidden overflow-y-auto py-5 justify-center flex flex-row flex-wrap sm:grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-4 gap-8'>
          {isOpen && allImages.map((image) => {

            const isActive = selectedImages.find((imageSelected) => imageSelected.id === image.id) 

            return (
              <div
                key={image.id}
                className='relative w-[125px] h-[125px] rounded-md group cursor-pointer group'
              > 
                <Button
                  onClick={() => {
                    if(isActive){
                      removeImage(image.id);
                    }
                    else{
                      addImage(image);
                    }
                  }}
                  className={`absolute w-full h-full ${!isActive ? "hidden group-hover:flex": "flex"} flex-row items-center justify-center z-30 opacity-70`}
                >
                  <Check />
                </Button>
                <Image 
                  src={image.imageUrl}
                  alt={image.id}
                  fill     
                  className="object-contain rounded-md"         
                />
              </div>
            )
          })}
        </div>
        <div className='py-5 flex flex-row gap-5'>
          <Button className='flex flex-row gap-2' onClick={onClose}>
            <Check /> Conferma
          </Button>
          <Button className='flex flex-row gap-2' outline onClick={() => {
            onClose?.();
            uploadImageModal.onOpen();
          }}>
            <Upload /> Carica altre immagini
          </Button>
        </div>
      </div>
    </Modal>
  )
}

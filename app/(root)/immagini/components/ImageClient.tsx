"use client"

import React, { useState } from 'react'
import Header from '@/components/Header'
import Button from '@/components/ui/Button'
import { Trash, Upload } from 'lucide-react'
import UploadImageModal from '@/components/modals/UploadImageModal'
import { useImageUploader } from '@/hooks/useImageUploader'
import Image from 'next/image'
import { Image as ImageType } from '@prisma/client'
import { useDeleteSomething } from '@/hooks/useDeleteSomething'
import DeleteSomething from '@/components/modals/DeleteSomething'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface ImageClient{
  images: ImageType[]
}

export default function ImageClient({
  images
}: ImageClient) {

  const imageUploader = useImageUploader();
  const deleteModal = useDeleteSomething();

  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string>();

  const router = useRouter();

  const onDelete = async () => {
    try{
      setIsLoading(true);

      await axios.delete(`/api/images/${deleteId}`);
      toast.success("Immagine eliminata con successo");
    }catch(err){
      toast.error("Impossibile eliminare l'immagine (controllare che non sia presente in una o più sezione/i)");
      console.log(err);
    }
    finally{
      setIsLoading(false);
      deleteModal.onClose();
      router.refresh();
    }
  }

  const onOpenDelete = (id: string) => {
    deleteModal.onOpen();
    setDeleteId(id);
  }

  const onCancelDelete = () => {
    deleteModal.onClose();
    setDeleteId(undefined);
  }

  return (
    <>
      <DeleteSomething 
        isOpen={deleteModal.isOpen}
        onDelete={onDelete}
        closeModal={onCancelDelete}
        disabled={isLoading}
      />
      <UploadImageModal
        isOpen={imageUploader.isOpen}
        onClose={imageUploader.onClose}
      />
      <div className='p-5'>
        <Header 
          title={`Immagini(${images.length})`}
          description={`Gestisci tutte le ${images.length} immagini`}
        >
          <Button
            className='flex flex-row gap-2'
            onClick={imageUploader.onOpen}
          >
            <Upload /> Immagini
          </Button>
        </Header>
        <div className='flex justify-center'>
          <div className='py-5 justify-center flex flex-row flex-wrap sm:grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-4 gap-8'>
            {images.map((image) => (
              <div
                key={image.id}
                className='relative md:w-[250px] md:h-[250px] w-[150px] h-[150px] rounded-md group cursor-pointer'
              >
                <Button
                  className="hidden group-hover:flex absolute z-10 right-0 w-full h-full items-center justify-center"
                  onClick={() => onOpenDelete(image.id)}
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
        </div>
      </div>
    </>
  )
}

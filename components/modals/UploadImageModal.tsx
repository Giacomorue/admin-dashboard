"use client"

import { ImagePlus, Upload, Trash } from "lucide-react";
import Modal from "../Modal"
import { CldUploadWidget } from "next-cloudinary"
import Button from "../ui/Button"
import { useState } from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UploadImageModalProps{
  isOpen: boolean
  onClose: () => void
}

export default function UploadImageModal({
  isOpen, onClose
}: UploadImageModalProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<string>>([]);
  const router = useRouter();

  const onAddImage = (result: any) => {
    setImages((prev) => [...prev, result.info.secure_url]);
  }

  const onRemove = (url: string) => {
    setImages((prev) => [...prev.filter((u) => u !== url)]);
  }

  const closeModal = () => {
    setImages([]);
    onClose();
    router.refresh();
  }

  const onUpload = async () => {
    if(images.length <= 0){
      return;
    }

    try{
      setIsLoading(true);

      const res = await axios.post("/api/images", {
        images
      });
  
      if(res.status === 200){
        toast.success("Immagini caricate con successo");
        closeModal();
        return;
      }
    } catch(err){
      toast.error("Errore nel caricamento delle immagini");
      console.log(err);
    }
    finally{
      setIsLoading(false);
    }
    
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Carica immagini"
      description="Carica le immagini da aggiungere al sito"
    >
      <div className="max-w-[800px]">
        <div 
          className="my-2 flex items-center gap-4 flex-wrap max-h-[400px] overflow-x-hidden overflow-y-auto justify-center "
        >
          {images.map((url) => (
            <div 
              key={url}
              className="relative w-[150px] h-[150px] rounded-md overflow-hidden group"
            >
              <Button
                className="hidden group-hover:flex absolute z-10 right-0 w-full h-full items-center justify-center"
                onClick={() => onRemove(url)}
              >
                <Trash
                  className="h-4 w-4"
                />
              </Button>

              <Image 
                src={url}
                alt="Image"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <CldUploadWidget onUpload={onAddImage} uploadPreset="zegrtvfu">
          {({open}) => {
            const onClick = () => {
              open();
            }

            return (
              <Button
                disabled={isLoading}
                onClick={onClick}
                className="mt-3 mb-5 flex flex-row gap-2 items-center"
                center
                
              >
                <ImagePlus
                />
                Seleziona Immagini
              </Button>
            )
          }}
        </CldUploadWidget>
        <Separator />
        <Button
          onClick={onUpload}
          big
          className="flex flex-row items-center gap-x-3 mt-3"
          center
          outline
          disabled={isLoading || images.length <= 0}
        >
          <Upload />
          Carica Immagini
        </Button>
      </div>
    </Modal>
  )
}

"use client"

import { XIcon } from "lucide-react";
import Header from "./Header";
import Button from "./ui/Button";

interface UploadImageModal{
  children: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  onClose?: () => void;
}

export default function Modal({
 isOpen, onClose, children, title, description
}: UploadImageModal) {

  if(!isOpen){
    return null;
  }

  return (
    <div className='fixed top-0 right-0 bg-black/20 h-screen w-screen inset-0 flex justify-center items-center z-50 overflow-hidden'>
      <div className="p-5 bg-gray-100 rounded-lg shadow-md w-full md:w-auto md:min-w-[600px] max-h-full sm:w-3/4">
        <Header 
          title={title}
          description={description}
          small
        >
          <Button
            outline
            className="sm:ml-20"
            onClick={onClose}
          >
            <XIcon />
          </Button>
        </Header>
        {children}
      </div>
    </div>
  )
}

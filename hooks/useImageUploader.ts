import { create } from "zustand";

interface ImageUploadStore{
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useImageUploader = create<ImageUploadStore>((set) => ({
  isOpen: false,
  onClose: () => set({isOpen: false}),
  onOpen: () => set({isOpen: true}),
}))
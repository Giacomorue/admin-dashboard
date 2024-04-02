import { create } from "zustand";

interface SelectImageStore{
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useSelectImageModal = create<SelectImageStore>((set) => ({
  isOpen: false,
  onClose: () => set({isOpen: false}),
  onOpen: () => set({isOpen: true}),
}))
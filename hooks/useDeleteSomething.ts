import { create } from "zustand";

interface DeleteSomethingsStore{
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useDeleteSomething = create<DeleteSomethingsStore>((set) => ({
  isOpen: false,
  onClose: () => set({isOpen: false}),
  onOpen: () => set({isOpen: true}),
}))
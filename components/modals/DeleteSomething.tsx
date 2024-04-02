import React from 'react'

import Modal from '../Modal'
import Button from '../ui/Button'

interface DeleteSomethingProps{
  isOpen: boolean
  closeModal: () => void
  onDelete: () => void
  disabled?: boolean
}

export default function DeleteSomething({
  isOpen, closeModal, onDelete, disabled
}: DeleteSomethingProps) {

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Elimina"
      description="Sei sicuro di voler eliminare? L'opzione non sarà reversibile"
    >
      <div className="max-w-[800px] flex flex-row items-center justify-end gap-x-5 mt-4 w-full">
        <Button
         onClick={onDelete}
         big
         disabled={disabled}
        >
          Elimina
        </Button>
        <Button
          onClick={closeModal}
          outline
          big
          disabled={disabled}
        >
          Annulla
        </Button>
      </div>
    </Modal>
  )
}

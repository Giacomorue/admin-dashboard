import React, { ChangeEvent } from 'react'

interface CheckboxProps{
  title: string;
  description: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function Checkbox({
  title, description, checked, onChange, disabled
}: CheckboxProps) {
  return (
    <div className='ring-1 ring-lightblack rounded-md'>
      <div className='p-2 flex justify-center items-center gap-5'>
        <input type="checkbox" checked={checked} onChange={onChange} className='h-4 w-4 rounded-md' disabled={disabled}/>
        <div className=''>
          <h3 className='font-semibold text-lg text-lightblack'>{title}</h3>
          <p className='text-sm text-neutral-600'>{description}</p>
        </div>
      </div>
    </div>
  )
}

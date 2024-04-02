"use client"

import { ChangeEvent } from "react";

interface InputProps{
  label: string;
  disabled: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  backgroundColor?: string;
}

export default function TextArea({
  label, disabled, onChange, value, backgroundColor
}: InputProps) {
  return (
    <div className="relative ">
      <textarea 
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`ring-1 ring-lightblack w-full rounded-md ring-muted-foreground p-4 peer outline-none focus:ring-red transition-all text-lightblack focus:ring-2 ${backgroundColor ? backgroundColor : "bg-white"}`}
      />
      <p
        className={`absolute top-0 scale-75 left-2 peer-focus-within:scale-100 peer-focus-within:-translate-y-3 px-1 transition-all duration-100 ease-in-out peer-focus-within:left-3 text-lightblack peer-focus-within:text-red ${backgroundColor ? backgroundColor : "bg-white"}`}
      >{label}</p>
    </div>
  )
}

"use client"

import React, { ChangeEvent } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectComponentProps{
  label: string;
  disabled: boolean;
  onChange: (value: string) => void;
  value?: string;
  backgroundColor?: string;
  data: Array<{name: string, value: string}>
}

export default function SelectComponent({
  label, disabled, onChange, value, backgroundColor, data
}: SelectComponentProps) {
  return (
    <Select 
      onValueChange={onChange} 
      value={value} 
      disabled={disabled}
    >
      <SelectTrigger className={`ring-1 ring-lightblack w-full rounded-md ring-muted-foreground p-4 peer outline-none focus:ring-red transition-all text-lightblack focus:ring-2 ${backgroundColor ? backgroundColor : "bg-white"}`}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent
        className={`ring-1 ring-lightblack rounded-md ring-muted-foreground text-lightblack ${backgroundColor ? backgroundColor : "bg-white"}`}
      >
        {data.map((state) => (
          <SelectItem className="cursor-pointer" value={state.value} key={state.value}>{state.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

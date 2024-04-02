"use client"

import { useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"

import Button from "@/components/ui/Button"

import { Copy, Edit, MoreVertical, Trash } from "lucide-react"
import { SectionColumType } from "@/types";

import axios from "axios"
import DeleteSomething from "@/components/modals/DeleteSomething"
import { useDeleteSomething } from "@/hooks/useDeleteSomething"
import { Separator } from "@/components/ui/separator"


export default function CellAction({
  section
} : {section: SectionColumType}) {
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onDelete = async () =>{
      try{
        setLoading(true);
        const response = await axios.delete(`/api/sections/${section.id}`);
        console.log(response);
        toast.success("Sezione eliminata");
        router.refresh();
      } catch(err){
        console.log(err);
        toast.error("Rimuovi la sezione da tutte le pagine prima");
      } finally{
        setLoading(false);
        setIsOpen(false);
      }
    }

    return (
      <>
        <DeleteSomething 
          isOpen={isOpen}
          onDelete={onDelete}
          closeModal={() => setIsOpen(false)}
          disabled={loading}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="h-4 w-4 cursor-pointer " />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              disabled={loading}
              onClick={() => router.push(`/sito/sezioni/${section.id}`)}
              className="cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <Separator className="my-1" />
            <DropdownMenuItem
              disabled={loading}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
}

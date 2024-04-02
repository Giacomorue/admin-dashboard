"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellActionSezione"
import { PageColumType, SectionColumType } from "@/types"
import { PageType } from "@/constant"
import CellActionPage from "./CellActionPage"


export const SectionColumn: ColumnDef<SectionColumType>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    header: "Tipo Sezione",
    cell: ({row}) => {
      const section = row.original;
      const name = PageType.find((p) => p.value === section.pageType)?.name;

      return (name)
    }
  },
  {
    id: "Actions",
    header: "Azioni",
    cell: ({ row }) => {
      const section = row.original; 
 
      return (
        <CellAction section={section} />
      )
    },
  }
]

export const PageColumn: ColumnDef<PageColumType>[] = [
  {
    header: "Nome",
    accessorKey: "pageName"
  },
  {
    header: "Link",
    accessorKey: "link"
  },
  {
    header: "Pagina Principale",
    cell: ({ row }) => {
      const page = row.original;

      return (
        <div>
          {page.defaultPage ? "Predefinita": "No"}
        </div>
      )
    }
  },
  {
    header: "Ordine navbar",
    accessorKey: "navbarOrder"
  },
  {
    header: "Visibile",
    cell: ({ row }) => {
      const page = row.original;

      return (
        <div>
          {page.visiblePage ? "Si": "No"}
        </div>
      )
    }
  },
  {
    id: "Actions",
    header: "Azioni",
    cell: ({ row }) => {
      const page = row.original; 
 
      return (
        <CellActionPage page={page} />
      )
    },
  }
]

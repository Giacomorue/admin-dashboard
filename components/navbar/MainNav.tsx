"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { routes } from "@/constant";

export default function MainNav() {

  const pathName = usePathname();

  return (
    <div className="flex flex-row sm:gap-x-5 gap-x-2">
      {routes.map((route) => {
        const isActive = pathName.split("/").at(1) === route.url;
        return (
          <Link 
            key={route.url} 
            href={`/${route.url}`}
            className={`${isActive ? "text-red" : "text-lightblack"} group`}
          >
            <div className="flex-col items-center flex ">
              <p
                className={``}
              >
                {route.label}
              </p>
              <div className={`h-[1px] ${isActive ? "w-full bg-red" : "w-0 group-hover:w-full bg-lightblack transition-all ease-linear duration-200"}`}  />
            </div>
          </Link>
        )
      })}
    </div>
  )
}

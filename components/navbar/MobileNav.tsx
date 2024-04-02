"use client"

import Link from "next/link";
import React, { useState } from 'react'
import { routes } from "@/constant";
import Button from "../ui/Button";
import { MenuIcon, XIcon } from "lucide-react";
import LogoutBtn from "./LogoutBtn";

export default function MobileNav() {

  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    <>
    <Button
      onClick={() => setMenuOpen(true)}
      disabled={menuOpen}
      className="absolute top-3 right-4"
    >
      <MenuIcon />
    </Button>


    <div className={`h-screen w-screen top-0 fixed inset-0 ${menuOpen ? "right-0" : "left-full"} transition-all duration-200 z-30 bg-gray-100`}>
      <Button
        onClick={() => setMenuOpen(false)}
        disabled={!menuOpen}
        className="absolute top-3 right-4"
      >
        <XIcon />
      </Button>
      <div className="flex flex-col items-center justify-center w-full h-full gap-y-12">
        {routes.map((route) => (
          <Link 
            key={route.url} 
            href={`/${route.url}`}
            className={`text-lightblack group`}
            onClick={() => setMenuOpen(false)}
          >
            <p
              className={`text-5xl`}
            >
              {route.label}
            </p>
          </Link>
        ))}
        <LogoutBtn />
      </div>
    </div>
    </>
  )
}

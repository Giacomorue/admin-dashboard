"use client"

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input"
import Image from "next/image"
import { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    signOut({
      redirect: false,
    });
    console.log("Mounted page");
  }, [])

  const router = useRouter();

  const onClick = async () => {
    if(!email || !password){
      toast.error("Inserisci le credenziali");
      return;
    }

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if(login?.error){
      toast.error("Credenziali non valide");
    }

    if(login?.status===200){
      toast.success("Accesso eseguito con successo");
      router.push("/");
    }
  }

  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-100">
      <div className="p-4 w-full sm:w-3/4 md:w-auto shadow-md rounded-lg bg-white">
        <div className="w-full px-3 space-y-8">
          {/* Image */}
          <div className="flex flex-row justify-center">
            <Image 
              src={"/logo.png"}
              alt="Logo"
              height={1}
              width={250}
            />
          </div>

          {/* Input */}
          <Input 
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            disabled={false}
          />
          <Input 
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            disabled={false}
          />
          <p className="text-sm text-neutral-600">
            <span className="font-semibold text-lightblack">Consiglio:</span> La email è quella di ruetta e la password è la stessa del NAS
          </p>
          <Button
            onClick={onClick}
            center
            full
          >
            Accedi
          </Button>
        </div>
      </div>
    </div>
  )
}

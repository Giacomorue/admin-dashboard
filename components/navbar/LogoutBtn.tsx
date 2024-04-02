"use client"

import Button from '@/components/ui/Button';
import { signOut } from 'next-auth/react';

const logout = () => {
    signOut();
}

export default function LogoutBtn() {
  return (
    <Button
      onClick={logout}
      big
      outline
    >
        Logout
    </Button>
  )
}

import Navbar from '@/components/navbar/Navbar';
import authOptions from '@/lib/AuthOptions'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation';

export default async function RootProtectedLayout({children} : {children: React.ReactNode}) {

  const session = await getServerSession(authOptions);

  if(!session?.user?.email){
    redirect("/signin");
  }

  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

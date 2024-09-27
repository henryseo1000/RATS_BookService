"use client";

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@clerk/clerk-react';
import { Toaster } from 'sonner';

import NavBar from "@/layout/NavBar";

import "./globals.css";
import SearchBar from '@/components/common/SearchBar';

export default function RouteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [minimize, setMinimize] = useState<boolean>(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {

  }, [])

  if ( !isSignedIn ) {
    return redirect('/');  
  }

  return (
    <div>
      <NavBar isMinimized={minimize} setMinimize={setMinimize}/>
      <main className={minimize ? "main_minimized" : "main_maximized"}>
        <SearchBar/>
        <Toaster position="bottom-right"/>
        {children}
      </main>
    </div>
  );
}
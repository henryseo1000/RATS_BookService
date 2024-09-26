"use client";

import { Toaster } from 'sonner'

import NavBar from "@/layout/NavBar";
import { redirect } from 'next/navigation';
import { useAuth } from '@clerk/clerk-react';

import "./globals.css";
import { useState } from 'react';

export default function RouteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [minimize, setMinimize] = useState<boolean>(false);
  const { isSignedIn } = useAuth();

  if ( !isSignedIn ) {
    return redirect('/');  
  }

  return (
    <div>
      <NavBar isMinimized={minimize} setMinimize={setMinimize}/>
      <main className={minimize ? "main_minimized" : "main_maximized"}>
        <Toaster position="bottom-right"/>
        {children}
      </main>
    </div>
  );
}
"use client";

import { Toaster } from 'sonner'

import NavBar from "@/layout/NavBar";
import { redirect } from 'next/navigation';
import { useAuth } from '@clerk/clerk-react';

import "./globals.css";
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { navState } from '@/state/NavState';

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
        <Toaster position="bottom-right"/>
        {children}
      </main>
    </div>
  );
}
import { Toaster } from 'sonner'

import "./globals.css";
import NavBar from "@/layout/NavBar";

export default function RouteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar/>
      <main>
        <Toaster position="bottom-right"/>
        {children}
      </main>
    </div>
  );
}
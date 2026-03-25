import type { Metadata } from "next";
import { Toaster } from 'sonner'
import { ConvexProvider } from "@/components/providers/ConvexProvider";

import "./globals.css";
import RecoilRootProvider from "@/components/providers/RecoilRootProvider";
import { Dosis } from 'next/font/google';

const dosis = Dosis({
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Mr.Story",
  description: "Welcome to Mr.Story!",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/image/favicon_light.png",
        href: "/image/favicon_light.png"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/image/favicon_dark.png",
        href: "/image/favicon_dark.png"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dosis.className}>
        <ConvexProvider>
          <RecoilRootProvider>
            <Toaster position="bottom-right"/>
            { children }
          </RecoilRootProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}

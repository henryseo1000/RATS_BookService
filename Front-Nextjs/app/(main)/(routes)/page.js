"use client";
import { useEffect } from 'react';
import Intro from "../_components/Intro.jsx"

export default function Home() {
  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll({
            
          });
      }
    )()
  }, [])

  return (
    <div className='flex flex-col bg-black' data-scroll-container>
      <Intro/>
      <div className='bg-black h-screen w-full'></div>
      <div className='bg-black h-screen w-full'></div>
    </div>
  );
}

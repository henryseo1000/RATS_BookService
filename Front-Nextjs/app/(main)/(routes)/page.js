"use client";
import { useEffect } from 'react';
import Intro from "../_components/Intro.jsx"

export default function Home() {
  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
    <div className='flex flex-col'>
      <Intro/>
      <div className='bg-orange-500 h-screen w-full'></div>
      <div className='bg-orange-500 h-screen w-full'></div>
    </div>
  );
}

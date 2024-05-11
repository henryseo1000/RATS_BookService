"use client";
import { useEffect } from 'react';
import Footer from '../_components/Footer.jsx';
import Intro from "../_components/Intro.jsx";
import LocomotiveScroll from 'locomotive-scroll';

export default function Home() {
  useEffect( () => {
    (
      async () => {
          const locomotiveScroll = new LocomotiveScroll({
        });
      }
    )()
  }, [])

  return (
    <div className='flex flex-col bg-black select-none'>
      <Intro/>
      <div className='bg-black h-screen w-full'></div>
      <div className='bg-black h-screen w-full'></div>
      <Footer/>
    </div>
  );
}

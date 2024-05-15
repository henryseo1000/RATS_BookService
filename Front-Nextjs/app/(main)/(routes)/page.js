"use client";
import { useEffect, useRef } from 'react';
import Footer from '../_components/Footer.jsx';
import Intro from "../_components/Intro.jsx";
import LocomotiveScroll from 'locomotive-scroll';

export default function Home() {
  const scrollRef = useRef(null)
  useEffect(() => {
    import("locomotive-scroll").then(locomotiveModule => {
      const scroll = new locomotiveModule.default({
        el: scrollRef.current,
        smooth: true,
        smoothMobile: true,
      })
    })
  }, [])

  return (
    <div ref={scrollRef} className='flex flex-col bg-black select-none'>
      <Intro/>
      <div className='bg-black h-screen w-full'></div>
      <div className='bg-black h-screen w-full'></div>
      <Footer/>
    </div>
  );
}

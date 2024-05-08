"use client"
import React, { useLayoutEffect, useRef } from 'react'
import { ArrowForwardIcon } from "@chakra-ui/icons"
import Image from "next/image"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Intro(){
  const background = useRef(null);
  const introImage = useRef(null);
  const homeHeader = useRef(null);

  useLayoutEffect( () => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: document.documentElement,
            scrub: true,
            start: "top",
            end: "+=200px",
        },
    })

    timeline
        .from(background.current, {clipPath: `inset(0%)`})
        .to(background.current, {clipPath: `inset(10%)`})
  }, [])

  return(
    <div ref={homeHeader} className="relative flex w-full h-screen justify-center" data-scroll-container>
      <div ref={background} className="flex h-screen w-full absolute brightness-50 object-cover">
        <Image src="/images/library.jpg" fill={true} priority={true}/>
      </div>
      <div className="items-center justify-center text-center flex flex-col w-full h-full">
        <div data-scroll data-scroll-speed="-5" className="left-1/4 top-12 flex w-72 h-96 absolute brightness-75">
          <Image src="/images/ganzi.jpeg" fill={true} priority={true}/>
        </div>
        <div data-scroll data-scroll-speed="2" className="bottom-24 flex w-72 h-96 absolute brightness-75">
          <Image src="/images/ganzi.jpeg" fill={true} priority={true}/>
        </div>
        <div ref={introImage} data-scroll data-scroll-speed="-5" className="right-1/4 top-12 flex w-72 h-96 absolute brightness-75">
          <Image src="/images/ganzi.jpeg" fill={true} priority={true}/>
        </div>
        <div data-scroll data-scroll-speed="0.3" className='z-10'>
          <h1 className="text-7xl font-bold">Hello! Welcome to RATS Community.</h1>
          <h2>If you want to know more about us, click button below!</h2>
          <button className="border rounded-md p-2 mt-10 hover:scale-110 duration-300">
            Check Out For More <ArrowForwardIcon/>
          </button>
        </div>
      </div>
    </div>
  )
}
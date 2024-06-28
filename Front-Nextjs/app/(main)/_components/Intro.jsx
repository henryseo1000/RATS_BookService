"use client"
import React, { useLayoutEffect, useRef, useEffect } from 'react'
import { ArrowForwardIcon, SpinnerIcon } from "@chakra-ui/icons"
import Image from "next/image"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth0 } from '@auth0/auth0-react';

export default function Intro(){
  const { isAuthenticated, isLoading, user } = useAuth0();
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
    .to(background.current, {clipPath: `inset(15%)`})
  })

  return(
    <div ref={homeHeader} className="relative flex w-full h-screen justify-center" data-scroll-container>
      <div ref={background} className="flex h-screen w-full absolute brightness-50">
        <Image className="object-cover" src="/images/library.jpg" draggable={false} fill={true} priority={true}/>
      </div>
      <div className="relative items-center justify-center text-center flex w-full h-full">
        <div data-scroll data-scroll-speed="0.3" className='z-10'>
          { !isAuthenticated && !isLoading && (
          <>
          <h1 className="text-7xl font-bold">Hello! Welcome to RATS Community.</h1>
            <h2>If you want to know more about us, click button below!</h2>
              <a href='https://join.mju-rats.com/'>
              <button className="rounded-md p-2 mt-10 hover:scale-110 duration-300 bg-[#182D52]">
                  Check Out For More <ArrowForwardIcon/>
              </button>
            </a>
          </>
            )
          }

          { isLoading && (
            <div className='flex flex-row items-center justify-center mt-10'>
              <SpinnerIcon className="animate-spin mr-2"/>
              <p>Loading...</p>
            </div>
            )
          }

          { isAuthenticated && (
            <>
              <h1 className="text-7xl font-bold">Hi, {user.name}! Welcome Back!</h1>
              <button className="rounded-md p-2 mt-10 hover:scale-110 duration-300 bg-[#182D52]">
                  Go To Dashboard <ArrowForwardIcon/>
              </button>
            </>
          )
          }
        </div>
      </div>
    </div>
  )
}
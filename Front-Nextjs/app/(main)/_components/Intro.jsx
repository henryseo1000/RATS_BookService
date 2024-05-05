"use client"
import Image from "next/image"

export default function Intro(){

  return(
    <div className="flex h-full w-full">
      <Image src="/images/library.jpg" fill={true} priority={true}/>
      <div className="absolute items-center justify-center text-center flex w-full h-full text-7xl font-bold">
        Hello, Welcome to RATS.
      </div>
      <button>Check Out For More</button>
    </div>
  )
}
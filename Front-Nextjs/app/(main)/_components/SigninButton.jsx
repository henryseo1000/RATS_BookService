"use client";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function SigninButton({name, onClick}) {

  return(
    <div className="absolute h-32 w-48 hover:cursor-pointer left-0 bottom-0 text-[#ffffff]" onClick={onClick}>
        <h1 className="absolute text-xl left-5 bottom-4 font-semibold justify-center items-center z-10 transition transform hover:-translate-y-1">
          <a>
            {name}
            <ArrowForwardIcon className="ml-5" boxSize={25}/>
          </a>
        </h1>
        <div className="absolute left-0 bottom-0">
          <div className="triangle-2">
          
          </div>
        </div>
        <div className="absolute left-0 bottom-0">
          <div className="triangle-1">
          </div>
        </div>
    </div>
  )
}
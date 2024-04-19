"use client";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function SigninButton({name, onClick}) {
  return(
    <div className="absolute h-32 w-48 hover:cursor-pointer left-0 bottom-0">
      <h1 className="absolute text-xl left-7 bottom-5 font-semibold justify-center items-center z-10">
        <a>
          {name}
          <ArrowForwardIcon className="ml-5" boxSize={25}/>
        </a>
      </h1>
      <div className="absolute left-0 bottom-0" onClick={onClick}>
        <div className="triangle-2">
        
        </div>
      </div>
      <div className="absolute left-0 bottom-0" onClick={onClick}>
        <div className="triangle-1">
        
        </div>
      </div>
    </div>
  )
}
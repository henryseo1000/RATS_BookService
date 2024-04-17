"use client";
import { ArrowForwardIcon } from "@chakra-ui/icons";


export default function SigninButton() {
  return(
    <div className="fixed left-0 bottom-0 h-32 w-96">
      <h1 className="fixed left-9 bottom-7 text-xl font-semibold justify-center items-center">
        <a href="/sign-in">
          SIGN IN
          <ArrowForwardIcon className="ml-5" boxSize={25}/>
        </a>
      </h1>
      <div className="triangle-1">
      
      </div>
    </div>
  )
}
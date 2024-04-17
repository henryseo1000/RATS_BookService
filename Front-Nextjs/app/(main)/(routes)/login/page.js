"use client";
import Image from "next/image";
import SigninButton from "../../_components/SigninButton";
import { Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Login() {
  const [isSignin, setSignin] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col z-99 h-2/4 w-1/4 rounded-3xl">
        <a href="https://join.mju-rats.com/">
          <Image
                src="/icons/RATS_dark.svg"
                width="150"
                height="150"
                className="light:hidden"
          />
        </a>
        <div className="mt-10">
          <h1 className="text-left text-6xl font-semibold">Hi, There!</h1>
          <h3 className="mt-3 text-md">
            Welcome to RATS Community. 
            <br/>
            This is where future technology starts.
          </h3>
        </div>

        <div className="flex flex-col">
          <input placeholder="Enter Your ID" className="text-[#182D52] rounded-3xl w-full h-10 pl-5 mt-10"/>
          <input placeholder="Enter Your Password" type="password" className="text-[#182D52] rounded-3xl w-full h-10 pl-5 mt-5"/>
          <div className="flex flex-row mt-16 justify-between">
          { !isSignin &&
            (<>
            <Button className="h-10 w-1/4 border-double border-4 rounded-3xl font-bold">
              <ArrowBackIcon className="mr-1"/>
              PREV
            </Button>

            <Button className="h-10 w-1/4 border-double border-4 rounded-3xl font-bold">
              NEXT
              <ArrowForwardIcon className="ml-1"/>
            </Button>
            </>
          )}
          
          {isSignin && (<>
          <Button className="h-10 w-1/4 border-double border-4 rounded-3xl font-bold">
              NEXT
              <ArrowForwardIcon className="ml-1"/>
            </Button>
            </>
          )
          }
          </div>
        </div>
      </div>
      
      <SigninButton/>
    </div>
  );
}

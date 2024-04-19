"use client";
import Image from "next/image";
import SigninButton from "../../_components/SigninButton";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";

export default function Login() {
  const [isSignin, setSignin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#182D52]">
      <div className="flex flex-col z-99 h-2/4 w-1/4 rounded-3xl">
        <a href="https://join.mju-rats.com/">
          <Image
                src="/icons/RATS_dark.svg"
                width="130"
                height="130"
                className="light:hidden"
                draggable={false}
          />
        </a>
        <div className="mt-7">
          <h1 className="text-left text-6xl font-semibold">Hi, There!</h1>
          <h3 className="mt-3 text-md">
            Welcome to RATS Community. 
            <br/>
            This is where future technology starts.
          </h3>
        </div>

        <div className="flex flex-col">
          <input placeholder="Enter Your ID" className="text-[#182D52] rounded-3xl w-full h-10 pl-5 mt-10"/>
          <input placeholder="Enter Your Password" type={showPassword ? "text" : "password"} className="text-[#182D52] rounded-3xl w-full h-10 pl-5 mt-5"/>
          
          <div className="flex justify-center items-center mt-5 underline underline-offset-2">
            <Checkbox isChecked={showPassword} onChange={() => setShowPassword(!showPassword)}>
              Show Password?
            </Checkbox>
          </div>
          
          <div className="flex flex-row mt-10 justify-between">
            <button className="h-10 w-1/4 border-double border-4 rounded-3xl font-bold">
              <ArrowBackIcon className="mr-1"/>
              PREV
            </button>

            <button className="h-10 w-1/4 border-double border-4 rounded-3xl font-bold">
              NEXT
              <ArrowForwardIcon className="ml-1"/>
            </button>
          </div>
        </div>
      </div>
      
      <SigninButton name="SIGN IN" onClick={() => setSignin(!isSignin)}/>
    </div>
  );
}

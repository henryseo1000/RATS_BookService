"use client";
import Image from "next/image";
import SigninButton from "../../_components/SigninButton";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/dist/server/api-utils";
import { useConvexAuth } from "convex/react";

export default function SignUp() {
  const { loginWithRedirect } = useAuth0();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isAuthenticated){
    return redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#182D52]">
      <div className="flex flex-col z-99 h-2/3 w-1/4 rounded-3xl">
          <Image
                src="/icons/RATS_dark.svg"
                width="130"
                height="130"
                className="light:hidden"
                draggable={false}
          />
        <div className="mt-7 text-[#ffffff]">
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
          
          <div className="flex justify-center items-center mt-5 underline underline-offset-2 text-[#ffffff]">
            <Checkbox isChecked={showPassword} onChange={() => setShowPassword(!showPassword)}>
              Show Password?
            </Checkbox>
          </div>
          
          <div className="flex flex-row mt-10 justify-between text-[#ffffff]">
            <button id="prev" className="h-10 w-1/4 border-double border-4 rounded-3xl font-bold hover:-translate-y-2 transition">
              <ArrowBackIcon className="mr-1"/>
              PREV
            </button>

            <button id="next" className="h-10 w-1/4 border-double border-4 rounded-3xl font-bold hover:-translate-y-2 transition">
              NEXT
              <ArrowForwardIcon className="ml-1"/>
            </button>
          </div>
        </div>
      </div>
      
      <SigninButton name="OR SIGN IN" onClick={loginWithRedirect}/>
    </div>
  );
}

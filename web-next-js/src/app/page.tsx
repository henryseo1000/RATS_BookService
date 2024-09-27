"use client";

import { SignInButton, useAuth } from "@clerk/clerk-react";
import { redirect } from "next/navigation";

import st from "./Home.module.scss";

export default function Home() {
  const { isSignedIn } = useAuth();

  if ( isSignedIn ) {
    redirect('/dashboard')
  }

  return (
    <div>
      <div>
        
      </div>

      <SignInButton>
        <span>
          Log In
        </span>
      </SignInButton>
    </div>
  );
}

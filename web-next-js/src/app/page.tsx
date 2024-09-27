"use client";

import { SignInButton, useAuth } from "@clerk/clerk-react";
import st from "./Home.module.scss";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();

  if ( isSignedIn ) {
    redirect('/dashboard')
  }

  return (
    <div>

        <SignInButton>
          <span>Log In</span>
        </SignInButton>

    </div>
  );
}

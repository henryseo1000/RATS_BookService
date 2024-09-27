"use client";

import { SignInButton, useAuth } from "@clerk/clerk-react";
import st from "./Home.module.scss";

export default function Home() {
  const { isSignedIn } = useAuth();
  
  return (
    <div>
      <SignInButton>
        Login
      </SignInButton>
    </div>
  );
}

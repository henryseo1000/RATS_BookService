"use client";

import { SignInButton, useAuth, useUser } from "@clerk/clerk-react";
import { redirect } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();

  if ( isSignedIn ) {
    return redirect('/dashboard');
  }
  
  return (
    <div>
      <SignInButton>
        Login
      </SignInButton>
    </div>
  );
}

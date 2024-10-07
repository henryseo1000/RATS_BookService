"use client";

import { SignInButton, useAuth } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { redirect, usePathname, useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();
  const { isAuthenticated } = useConvexAuth();

  if ( isAuthenticated && isSignedIn ) {
    return redirect('/dashboard');
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

"use client";

import { SignInButton, useAuth } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { redirect, useRouter } from "next/navigation";

import st from "./Home.module.scss";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isSignedIn } = useAuth();
  const { isAuthenticated } = useConvexAuth();
  const router = useRouter();

  return (
    <div className={st.page_container}>
      {(isAuthenticated && isSignedIn) ?
        <Button 
          className={st.login_button}
          onClick={() => router.push('/dashboard')}
        >
          Log In
        </Button>

        :

        <SignInButton>
          <Button className={st.login_button}>
            Log In
          </Button>
        </SignInButton>
      }
    </div>
  );
}

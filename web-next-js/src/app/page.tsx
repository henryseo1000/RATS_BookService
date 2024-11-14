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

  if (isAuthenticated && isSignedIn) {
    return redirect('/dashboard');
  }

  return (
    <div className={st.page_container}>
      {(isAuthenticated && isSignedIn) ?
        <div
          onClick={() => {
            router.push("/dashboard")
          }}
        >
          Go To DashBoard
        </div>

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

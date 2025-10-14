"use client";

import { SignInButton, useAuth, useUser } from "@clerk/clerk-react";
import { useConvexAuth, useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import st from "./Home.module.scss";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";

export default async function Home() {
  const { isSignedIn } = useAuth();
  const { isAuthenticated } = useConvexAuth();
  const user = useUser();
  const checkRequired = useMutation(api.user.checkRequired);
  const router = useRouter();

  if (isSignedIn) {
    if (!(await checkRequired({user_id : user.user.id}))) {
      return router.push('/onboarding');
    }
    else {
      return (
        <div className={st.page_container}>
          <Button 
            className={st.login_button}
            onClick={() => router.push('/dashboard')}
          >
            Go To DashBoard
          </Button>
        </div>
      )
    }
  }

  else  {
    return (
      <div className={st.page_container}>
        <SignInButton>
          <Button className={st.login_button}>
            Log In
          </Button>
        </SignInButton>
      </div>
    );
  }
}

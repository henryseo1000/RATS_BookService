"use client";

import { SignInButton, useAuth } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import st from "./Home.module.scss";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { isSignedIn, getToken } = useAuth();
  const checkRequired = useMutation(api.user.checkRequired);
  const router = useRouter();

  const checkForCurrentUser = async () => {
    const checkResult = await getToken().then((token) => {
      return checkRequired({user_id : token});
    })

    return checkResult;
  }

  if (isSignedIn) {
    if (!checkForCurrentUser()) {
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

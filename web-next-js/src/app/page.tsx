"use client";

import { SignInButton, useAuth } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import st from "./Home.module.scss";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const checkRequired = useMutation(api.user.checkRequired);
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [checkRes, setCheckRes] = useState<boolean>();

  const checkForCurrentUser = async () => {
    const checkResult = await checkRequired({user_id : userId})
    .then((res) => {
      setChecked(true);
      setCheckRes(res);

      return res;
    })

    
    return checkResult;
  }

  useEffect(() => {
    if (isSignedIn && !checked) {
      checkForCurrentUser();
    }
  }, [isSignedIn])

  if (!isLoaded || checkRes === undefined) {
    return <Loading/>
  }

    if(isSignedIn && checkRes) {
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

    else if (isSignedIn && !checkRes) {
      return router.push('/onboarding');
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

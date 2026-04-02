"use client";

import { SignInButton, useAuth } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from 'recoil';

import st from "./Home.module.scss";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { userDataState } from "@/stores/userDataState";
import MainNav from "@/layout/MainNav";

export default function Home() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const checkRequired = useMutation(api.user.checkRequired);
  const getUserData = useMutation(api.user.getUserData);

  const router = useRouter();
  
  const [checked, setChecked] = useState<boolean>(false);
  const [checkRes, setCheckRes] = useState<boolean>();
  const setUserData = useSetRecoilState(userDataState);

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
      const userPromise = checkForCurrentUser();

      toast.promise(userPromise, {
        success: "유저 확인 완료!",
        loading: "유저 정보 확인중입니다.",
        error: "앗, 유저 확인 중 문제 발생!"
      })
    }
  }, [isSignedIn, checked])

  if (!isLoaded) {
    return <Loading/>
  }

  if(isSignedIn) {
    if (checkRes && checked) {
      getUserData({user_id : userId})
      .then((data) => setUserData({
        name: data?.real_name,
        login_id: data?.username,
        user_id: userId,
        student_id: data?.student_id,
        major: data?.major,
        grade : data?.grade
      }))
    }

    else if (!checkRes && checked) {
      return router.push('/onboarding');
    }

    else {
      return <Loading/>
    }
  }

  return (
    <div className={st.page_container}>
      <MainNav isSignedIn={isSignedIn}/>
      <div className={st.section_1}></div>
    </div>
  );
  
}

"use client";

import { useState } from 'react';
import { Toaster } from 'sonner';

import NavBar from "@/layout/NavBar";

import "./globals.css";
import SearchBar from '@/components/common/SearchBar';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import Loading from '../loading';
import { useSetRecoilState } from 'recoil';
import { userDataState } from '@/stores/userDataState';

export default function RouteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const checkRequired = useMutation(api.user.checkRequired);
  const getUserData = useMutation(api.user.getUserData);
  
  const router = useRouter();

  const [minimize, setMinimize] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [checkRes, setCheckRes] = useState<boolean>();
  const setUserData = useSetRecoilState(userDataState);

  if (!isLoaded) {
    return <Loading/>
  }
  else {
    if (!isSignedIn) {
      return router.push('/');
    }

    if(isSignedIn && !checked) {
      checkRequired({user_id : userId})
      .then ((res) => {
        setCheckRes(res);
        setChecked(true);
      })
      .then(() => {
        getUserData({user_id : userId})
        .then((data) => setUserData({
          name: data?.real_name,
          login_id: data?.username,
          user_id: userId,
          student_id: data?.student_id,
          major: data?.major,
          grade : data?.grade
        }))
      })

      return <Loading/>
    }

    if(checked && !checkRes) {
      return router.push('/');
    }
  }

  return (
    <div>
      <NavBar isMinimized={minimize} setMinimize={setMinimize}/>
      <main className={minimize ? "main_minimized" : "main_maximized"}>
        <SearchBar/>
        <Toaster position="bottom-right"/>
        {children}
      </main>
    </div>
  );
}
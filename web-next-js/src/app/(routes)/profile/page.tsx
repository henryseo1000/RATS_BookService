"use client"
import { SignOutButton, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import st from "./Profile.module.scss";
import Loading from '@/app/loading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecoilValue } from 'recoil';
import { userDataState } from '@/stores/userDataState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function Profile() {
  const { user, isLoaded } = useUser();
  const userData = useRecoilValue(userDataState);

  if (!isLoaded) {
    return <Loading/>
  }

  return (
    <div className={st.page_container}>
      <Card className={st.profile_area}>
        <CardHeader className={st.profile_header}>

          <img 
            src={user?.imageUrl ? user.imageUrl : "/public/image/user.png"} 
            alt="profile image"
          />
        </CardHeader>

        <CardContent className={st.user_information}>
          <div className={st.inform_area}>
            <div className={st.subtitle}>이름</div>
            <Input className={st.input} type="text" value={userData.name}/>
          </div>
          <div className={st.inform_area}>
            <div className={st.subtitle}>학번</div>
            <Input className={st.input} type="text" value={userData.student_id}/>
          </div>
          <div className={st.inform_area}>
            <div className={st.subtitle}>학과 정보</div>
            <Input className={st.input} type="text" value={userData.major}/>
          </div>
          <div className={st.inform_area}>
            <div className={st.subtitle}>학년 정보</div>
            <Input className={st.input} type="text" value={userData.grade}/>
          </div>
        </CardContent>

        <CardFooter className={st.footer_area}>
          <SignOutButton>
              <span className={st.sign_out}>
                SIGN OUT
              </span>
          </SignOutButton>
        </CardFooter>
      </Card>
      
      
    </div>
  )
}

export default Profile;
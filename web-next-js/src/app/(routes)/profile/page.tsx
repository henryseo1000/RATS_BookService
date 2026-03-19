"use client"
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import st from "./Profile.module.scss";
import Loading from '@/app/loading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecoilValue } from 'recoil';
import { userDataState } from '@/stores/userDataState';

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
            <input className={st.input} type="text" value={userData.name}/>
          </div>
          <div className={st.inform_area}>
            <div className={st.subtitle}>학번</div>
            <input className={st.input} type="text" value={userData.student_id}/>
          </div>
          <div className={st.inform_area}>
            <div className={st.subtitle}>학과 정보</div>
            <input className={st.input} type="text" value={userData.major}/>
          </div>
          <div className={st.inform_area}>
            <div className={st.subtitle}>학년 정보</div>
            <input className={st.input} type="text" value={userData.grade}/>
          </div>
        </CardContent>
      </Card>
      
      
    </div>
  )
}

export default Profile;
"use client"
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import st from "./Profile.module.scss";
import Loading from '@/app/loading';

function Profile() {
  const { user, isLoaded } = useUser();
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("60211579");

  const handleUserData = () => {
    setName(user?.username);
  }

  useEffect(() => {
    handleUserData();
  }, [isLoaded]);

  if (!isLoaded) {
    return <Loading/>
  }

  return (
    <div className={st.page_container}>
      <div className={st.profile_header}>
        <img 
          src={user?.imageUrl ? user.imageUrl : "/public/image/user.png"} 
          alt="profile image"
        />
      </div>
      
      <div className={st.user_information}>
        <div>
          <div>이름</div>
          <input type="text" value={name}/>
        </div>
        <div>
          <div>학번</div>
          <input type="text" value={id}/>
        </div>
        <div>
          <div>학과 정보</div>
          <input type="text" />
        </div>
        <div>
          <div>학년 정보</div>
          <input type="text" />
        </div>
      </div>
    </div>
  )
}

export default Profile;
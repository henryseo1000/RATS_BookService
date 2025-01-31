"use client"
import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import st from "./Profile.module.scss";

function Profile() {
  const { user } = useUser();
  const [name, setName] = useState<string>(user.username);
  const [id, setId] = useState<string>("60211579");

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
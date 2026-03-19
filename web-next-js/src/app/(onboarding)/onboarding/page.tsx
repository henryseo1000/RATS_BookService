'use client';

import React, { useState } from 'react';
import st from "./Onboarding.module.scss";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { redirect } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';

function OnBoarding() {
  const createUser = useMutation(api.user.createUser);
  const { user } = useUser();

  const [realName, setRealName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [grade, setGrade] = useState<number>(1);

  const handleClick = async () => {
    await createUser({
      real_name: realName,
      student_id: studentId,
      major: major,
      grade: grade.toString(),
      username: user.username
    })
    .then( 
      () => alert("유저 생성이 완료되었습니다.")
    )
    .then(() =>
      {
        redirect('/')
      }
    )
  }

  return (
    <div className={st.page_container}>
      <div>
        <Input placeholder="성명" value={realName} onChange={(e) => setRealName(e.currentTarget.value)}/>
        <Input placeholder="학번" value={studentId} onChange={(e) => setStudentId(e.currentTarget.value)}/>
        <Input placeholder="전공 학과" value={major} onChange={(e) => setMajor(e.currentTarget.value)}/>
        <Input placeholder="학년" min={1} max={4} type='number' value={grade} onChange={(e) => setGrade(e.currentTarget.valueAsNumber)}/>
        <Button
          onClick={() => {
            handleClick();
          }}
        >
          설정
        </Button>
      </div>
    </div>
  )
}

export default OnBoarding;
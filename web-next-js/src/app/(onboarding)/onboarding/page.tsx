'use client';

import React, { useState } from 'react';
import st from "./Onboarding.module.scss";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { redirect, useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function OnBoarding() {
  const createUser = useMutation(api.user.createUser);
  const { user } = useUser();
  const router = useRouter();

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
    .then (
      () => router.push('/')
    )
  }

  const handleId = async () => {

  }

  return (
    <div className={st.page_container}>
      <Card className={st.card}>
        <CardHeader>
          <CardTitle>유저 정보 생성</CardTitle>
          <CardDescription>유저 정보가 없으면 Mr.Story를 이용할 수 없습니다. <br/>동아리 유저가 아니어도 학번만 입력하면 이용가능해요!</CardDescription>
        </CardHeader>

        <CardContent className={st.input_area}>
          <Input placeholder="성명" value={realName} onChange={(e) => setRealName(e.currentTarget.value)}/>
          <div className={st.input_confirm}>
            <Input placeholder="학번" value={studentId} onChange={(e) => setStudentId(e.currentTarget.value)}/>
            <Button className={st.button}>중복 확인</Button>
          </div>
          <Input placeholder="전공 학과" value={major} onChange={(e) => setMajor(e.currentTarget.value)}/>
          <Input placeholder="학년" min={1} max={4} type='number' value={grade} onChange={(e) => setGrade(e.currentTarget.valueAsNumber)}/>
        </CardContent>

        <CardFooter>
          <Button
            className={st.button}
            onClick={() => {
              handleClick();
            }}
          >
            설정
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OnBoarding;
'use client';

import React, { useEffect, useState } from 'react';
import st from "./Onboarding.module.scss";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { redirect, useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Loading from '@/app/loading';

function OnBoarding() {
  const createUser = useMutation(api.user.createUser);
  const checkStudentId = useMutation(api.user.checkStudentId);

  const { user } = useUser();
  const router = useRouter();
  const { isSignedIn, isLoaded, userId } = useAuth();

  const [realName, setRealName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [grade, setGrade] = useState<number>(1);
  const [duplication, setDuplication] = useState<boolean>(false);
  const [idConfirmed, setIdConfirmed] = useState<boolean>(false);


  const handleClick = async () => {
    if (studentId.trim() === "") {
      alert("학번을 입력해주세요!");
      return;
    }

    if (!idConfirmed) {
      alert("학번 중복 확인을 해주세요!");
      return;
    }

    if (duplication) {
      alert("학번이 중복됩니다!");
      return;
    }

    await createUser({
      real_name: realName,
      student_id: studentId,
      major: major,
      grade: grade.toString(),
      username: user.username
    })
    .then (
      () => router.push('/')
    )
  }

  const handleId = async () => {
    if (studentId.trim() === "") {
      alert("학번을 입력해주세요!");
      return;
    }

    checkStudentId({student_id : studentId})
    .then((res) => {
      if (res) {
        alert("사용가능한 학번입니다.");
        setDuplication(false);
        setIdConfirmed(true);
      }
      else {
        alert("학번이 중복됩니다!");
      }
    })
  }

  useEffect(() => {
    if (!isSignedIn) {
      return router.push('/');
    }
  }, [])

  if (!isLoaded) {
    return <Loading/>
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
            <Input placeholder="학번" value={studentId} 
              onChange={(e) => {
                setStudentId(e.currentTarget.value);
                setIdConfirmed(false);
              }}/>
            <Button 
              className={st.button}
              onClick={() => {
                handleId();
              }}
              disabled={idConfirmed}
            >중복 확인</Button>
          </div>
          <Select
            value={major}
            onValueChange={(value) => setMajor(value)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="전공을 선택해주세요"
                defaultValue="미선택"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="미선택">전공을 선택해주세요</SelectItem>
              <SelectItem value="컴퓨터공학과">컴퓨터공학과</SelectItem>
              <SelectItem value="교통공학과">교통공학과</SelectItem>
              <SelectItem value="기계공학과">기계공학과</SelectItem>
              <SelectItem value="전자공학과">전자공학과</SelectItem>
              <SelectItem value="전기공학과">전기공학과</SelectItem>
            </SelectContent>
          </Select>
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
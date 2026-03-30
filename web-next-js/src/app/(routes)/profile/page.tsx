"use client"
import { SignOutButton, useClerk, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import st from "./Profile.module.scss";
import Loading from '@/app/loading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userDataState } from '@/stores/userDataState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useConvexAuth, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function Profile() {
  const editUserData = useMutation(api.user.editUserData);
  const checkStudentId = useMutation(api.user.checkStudentId);

  const { user, isLoaded } = useUser();
  const userData = useRecoilValue(userDataState);
  const setUserData = useSetRecoilState(userDataState);
  const { signOut } = useClerk();

  const [name, setName] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [sentReq, setSentReq] = useState<boolean>(false);

  useEffect(() => {
    setName(userData.name);
    setStudentId(userData.student_id);
    setMajor(userData.major);
    setGrade(userData.grade);
  }, [userData])

  const handleEdit = async () => {
        const editPromise = editUserData({
          user_id: userData?.user_id,
          name: name,
          student_id: studentId,
          major: major,
          grade: grade
        })
        .then(() => {
            setUserData({
              name: name,
              login_id: userData.login_id,
              user_id: userData.user_id,
              student_id: studentId,
              major: major,
              grade : grade
            })
        })
        .then(() => {
          setSentReq(false);
        })

        toast.promise(editPromise, {
          success: "유저 정보가 수정되었습니다.",
          loading: "유저 정보를 변경하고 있습니다...",
          error: "에러가 발생했습니다!"
        })

        setSentReq(false);
    }

  const isChanged = () => {
    return userData.name !== name
    || userData.grade !== grade
    || userData.major !== major
    || userData.student_id !== studentId;

  }

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
            <Input 
              className={st.input} 
              type="text" 
              value={name} 
              onChange={(e) => {setName(e.currentTarget.value)}}
              disabled={sentReq}
            />
          </div>
          <div className={st.inform_area}>
            <div className={st.subtitle}>학번</div>
            <Input 
              className={st.input} 
              type="text" 
              value={studentId} 
              onChange={(e) => {setStudentId(e.currentTarget.value)}}
              disabled
            />
          </div>
          <div className={st.inform_area}>
            <div className={st.subtitle}>학과 정보</div>
            <Select
              value={major}
              onValueChange={(value) => setMajor(value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="전공을 선택해주세요"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="컴퓨터공학과">컴퓨터공학과</SelectItem>
                <SelectItem value="교통공학과">교통공학과</SelectItem>
                <SelectItem value="기계공학과">기계공학과</SelectItem>
                <SelectItem value="전자공학과">전자공학과</SelectItem>
                <SelectItem value="전기공학과">전기공학과</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={st.inform_area}>
            <div className={st.subtitle}>학년 정보</div>
            <Input 
              className={st.input} 
              type="text" 
              value={grade} 
              onChange={(e) => {setGrade(e.currentTarget.value)}}
              disabled={sentReq}
            />
          </div>
        </CardContent>

        <CardFooter className={st.footer_area}>
          <Button 
            className={st.sign_out}
            onClick={() => signOut()}
            disabled={sentReq}
          >
              <span>
                로그아웃
              </span>
          </Button>
          <Button 
            className={st.edit} 
            onClick={() => {
              setSentReq(true);
              handleEdit();
            }}
            disabled={!isChanged() || sentReq}
          >
              <span>
                수정
              </span>
          </Button>
        </CardFooter>
      </Card>
      
      
    </div>
  )
}

export default Profile;
"use client";

import React, { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw, Search } from 'lucide-react';

import st from "./Bookmark.module.scss";
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import Loading from '@/app/loading';
import { userDataState } from '@/stores/userDataState';
import { useRecoilValue } from 'recoil';

function Bookmark() {
  const getUserBookmark = useMutation(api.books.getUserBookmark);

  const [input, setInput] = useState<string>("");
  const [bookmarkList, setBookmarkList] = useState<any[]>([]);
  const [searched, setSearched] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("전체");

  const userData = useRecoilValue(userDataState);


  const { user, isLoaded } = useUser();

  const handleBookmarkList =() => {
    const bookmarkPromise = getUserBookmark({
      student_id: userData.student_id
    })
    .then((data) => {
      setBookmarkList(data.bookmarkList);
    })
    .finally(() => {
      setSearched(true);
    })

    toast.promise(bookmarkPromise, {
      loading: "북마크 목록을 가져오는 중입니다...",
      success: "북마크 목록을 가져왔습니다!",
      error: "앗... 문제가 발생하였습니다"
    })
  }

  useEffect(() => {
    handleBookmarkList();
  }, [searched])

  if (!isLoaded) {
    return <Loading/>
  }

  return (
    <div className={st.page_container}>
      <Card className={st.filter}>
        <Select>
          <SelectTrigger value={status} className={st.select}>
            <SelectValue placeholder="상태"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체</SelectItem>
            <SelectItem value="비치중">비치중</SelectItem>
            <SelectItem value="대출중">대출중</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className={st.input}
          type="text"
          placeholder='책 제목, 또는 ISBN으로 검색'
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <Button
          className={st.button}
        >
          검색
          <Search size={15}/>
        </Button>

        <Button
          onClick={handleBookmarkList}
          className={st.button}
        >
          새로고침
          <RotateCcw size={15}/>
        </Button>
      </Card>

      <Card className={st.files}>
        <CardHeader>
          <CardTitle>북마크 목록</CardTitle>
          <CardDescription>{userData.login_id}님의 북마크 목록입니다.</CardDescription>
        </CardHeader>

        <CardContent className={st.file_content}>
            <Table>
              <TableHeader className={st.table_header}>
                <TableRow>
                  <TableCell>상태</TableCell>
                  <TableCell>예약 날짜</TableCell>
                  <TableCell>책 이름</TableCell>
                  <TableCell>저자</TableCell>
                  <TableCell>ISBN</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookmarkList.map((item, index) => {
                  return (
                  <TableRow key={index}>
                    <TableCell>{item?.status}</TableCell>
                    <TableCell>{item?.date}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className={st.author}>
                      {item?.author}
                    </TableCell>
                    <TableCell
                      className={st.file_name}
                    >
                      {item?.isbn}
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter>

          </CardFooter>
      </Card>
    </div>
  )
}

export default Bookmark;
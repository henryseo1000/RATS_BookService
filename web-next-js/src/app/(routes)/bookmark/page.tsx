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

function Bookmark() {
  const getUserBookmark = useMutation(api.books.getUserBookmark);

  const [input, setInput] = useState<string>("");
  const [bookmarkList, setBookmarkList] = useState<any[]>([]);

  const { user } = useUser();

  const handleBookmarkList =() => {
    const bookmarkPromise = getUserBookmark({
      student_id: "60211579"
    })
    .then((data) => {
      setBookmarkList(data.bookmarkList);
    })

    toast.promise(bookmarkPromise, {
      loading: "북마크 목록을 가져오는 중입니다...",
      success: "북마크 목록을 가져왔습니다!",
      error: "앗... 문제가 발생하였습니다"
    })
  }

  useEffect(() => {
    handleBookmarkList();
  }, [])

  return (
    <div className={st.page_container}>
      <Card className={st.filter}>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="notBorrowed">이미지</SelectItem>
            <SelectItem value="borrowed">문서</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="분류" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">임베디드</SelectItem>
            <SelectItem value="dark">교양</SelectItem>
            <SelectItem value="system">물리</SelectItem>
          </SelectContent>
        </Select>       

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="예약 여부" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reserved">예약자 있음</SelectItem>
            <SelectItem value="notReserved">예약자 없음</SelectItem>
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
          <CardDescription>{user.username}님의 북마크 목록입니다.</CardDescription>
        </CardHeader>

        <CardContent className={st.file_content}>
            <Table>
              <TableHeader className={st.table_header}>
                <TableRow>
                  <TableCell>상태</TableCell>
                  <TableCell>등록 날짜</TableCell>
                  <TableCell>분류</TableCell>
                  <TableCell>책 이름</TableCell>
                  <TableCell>ISBN</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookmarkList.map((item, index) => {
                  return (
                  <TableRow key={index}>
                    <TableCell>{item?.format?.split("/")[0]}</TableCell>
                    <TableCell>{item?.file_size}KB</TableCell>
                    <TableCell>{item._creationTime}</TableCell>
                    <TableCell
                      className={st.file_name}
                    >
                      {item?.file_name}
                    </TableCell>
                    <TableCell>NO.13</TableCell>
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
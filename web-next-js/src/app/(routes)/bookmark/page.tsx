"use client";

import React, { useEffect, useRef, useState } from 'react';

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
import { toast } from 'sonner';
import Loading from '@/app/loading';
import { userDataState } from '@/stores/userDataState';
import { useRecoilValue } from 'recoil';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

function Bookmark() {
  const getUserBookmark = useMutation(api.books.getBookmarkByFilter);

  const [input, setInput] = useState<string>("");
  const [bookmarkList, setBookmarkList] = useState<any[]>([]);
  const [searched, setSearched] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("전체");
  const [paginationNum, setPaginationNum] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const userData = useRecoilValue(userDataState);

  const router = useRouter();
   const searchParams = useSearchParams();

  const handleBookmarkList = () => {
    const urlParamInput = searchParams.get('searchInput');
    const statusFilter = searchParams.get('status');

    const bookmarkPromise = getUserBookmark({
      input: urlParamInput ? urlParamInput : "",
      statusFilter : statusFilter ? statusFilter : "전체",
      student_id: userData.student_id,
      pageNum: currentPage
    })
    .then((data) => {
      setBookmarkList(data.filteredList);
      setPageCount(data.totalPages);
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

  const pagination = () => {
          const arr = []
          let startIdx = 1;
          let endIdx = 1;
  
          if (currentPage + (paginationNum - 1) <= pageCount) {
              startIdx = currentPage;
              endIdx = currentPage + (paginationNum - 1);
          }
          else {
              if (pageCount < paginationNum) {
                  startIdx = 1;
                  endIdx = pageCount;
              }
              else {
                  startIdx = pageCount - (paginationNum - 1);
                  endIdx = pageCount;
              }
          }
  
          for (let i = startIdx; i <= endIdx; i++) {
              arr.push(
                  <PaginationItem key={i}>
                      <PaginationLink 
                          onClick={() => {
                              setCurrentPage(i);
                              setSearched(false);
                          }}
                          isActive={i === currentPage}
                      >
                          {i}
                      </PaginationLink>
                  </PaginationItem>
              );
          }
          
          return arr;
      }

  const handlePaginationResize = () => {
        if(window.innerWidth <= 768) {
            setPaginationNum(5);
        }
        else {
            setPaginationNum(10);
        }
    }

  const onEnter = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        searchButtonRef.current.click();
      }
    }

  const handleReset = () => {
        router.replace('/bookmark');
        setCurrentPage(1);
        setSearched(!searched);
    }

  useEffect(() => {
    handlePaginationResize();
    window.addEventListener("resize", handlePaginationResize);

    if(searchParams.get('searchInput')) {
      setInput(searchParams.get('searchInput'));
    }
    else {
      setInput("")
    }

    if(searchParams.get('status')) {
      setStatus(searchParams.get('status'));
    }
    else {
      setStatus("전체");
    }

    handleBookmarkList();

    return () => window.removeEventListener("resize", handlePaginationResize);
  }, [searched])

  return (
    <div className={st.page_container}>
      <Card className={st.filter}>
        <Select value={status} onValueChange={(value) => setStatus(value)}>
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
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyUp={onEnter}
        />

        <Button
          ref={searchButtonRef}
          className={st.button}
          onClick={() => {
            setCurrentPage(1);
            setSearched(false);
            router.replace(`/bookmark?searchInput=${input=="" ? "" :input}&status=${status}`);
          }}
        >
          검색
          <Search size={15}/>
        </Button>

        <Button
          onClick={handleReset}
          className={st.button}
        >
          초기화
          <RotateCcw size={15}/>
        </Button>
      </Card>

      <Card className={st.files}>
        <CardHeader>
          <CardTitle>북마크 목록</CardTitle>
          <CardDescription>{userData.login_id}님의 북마크 목록입니다.</CardDescription>
        </CardHeader>

        <CardContent className={st.file_content}>
            <Table className={st.bookmark_table}>
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
                {bookmarkList?.map((item, index) => {
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
                <Pagination>
                    <PaginationContent
                        onChange={(e) => {e.currentTarget.ariaValueText}}
                    >
                        <PaginationItem>
                            <PaginationPrevious 
                                onClick={(e) => {
                                    setCurrentPage((currentPage) => {
                                        if(currentPage > 1) {
                                            return currentPage - 1;
                                        }
                                        else {
                                            return currentPage;
                                        }
                                })
                                setSearched(false);
                            }}
                            />
                        </PaginationItem>
                        {
                            pagination().map((page, index) => (page))
                        }
                        <PaginationItem>
                            <PaginationNext
                            onClick={(e) => {
                                setCurrentPage((currentPage) => {
                                    if(currentPage < pageCount) {
                                        return currentPage + 1;
                                    }
                                    else {
                                        return currentPage;
                                    }
                                })
                                setSearched(false);
                            }}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
          </CardFooter>
      </Card>
    </div>
  )
}

export default Bookmark;
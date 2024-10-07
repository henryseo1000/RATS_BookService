"use client";

import React, { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';

import st from './BookList.module.scss';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { Search, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { ChartCard } from "@/components/common/ChartCard";
  

function BookList() {
    const getBooks = useMutation(api.api.getBooks);
    const [bookCount, setBookCount] = useState<number>(0);
    const [reservedCount, setReservedCount] = useState<number>(1);
    const [list, setList] = useState<any[]>([]);

    const handleBooks = () => {
        const bookPromise = getBooks().then(data => {
            setList(data);
            setBookCount(data?.length!);
        });
        toast.promise(bookPromise, {
            loading: "Getting Books...",
            success: "Got Book List From Database!",
            error: "Oops, Something Went Wrong..."
        })
    }

    useEffect(() => {
        handleBooks();
    }, [])

    return (
        <div className={st.page_container}>
            <div className={st.status}>
                <ChartCard
                    title={"총 비치된 책 권수"}
                    description={"동아리 도서 현황"}
                    maxVal={500}
                    countVal={bookCount}
                    chartInsideText={`${bookCount}권이 비치되어 있습니다.`}
                />
                <ChartCard
                    title={"예약 도서 수"}
                    description={"동아리 도서 현황"}
                    maxVal={bookCount}
                    countVal={reservedCount}
                    chartInsideText={`${reservedCount}권이 예약중입니다.`}
                />
            </div>
            <Card className={st.filter}>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="상태" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">비치중</SelectItem>
                        <SelectItem value="dark">대출중</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="분류" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
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

                <Button
                    onClick={() => {}}
                    className={st.button}
                >
                    검색
                    <Search size={15}/>
                </Button>

                <Button
                    onClick={handleBooks}
                    className={st.button}
                >
                    새로고침
                    <RotateCcw size={15}/>
                </Button>
            </Card>
            <Card className={st.table_container}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>상태</TableCell>
                                <TableCell>등록 날짜</TableCell>
                                <TableCell>책 이름</TableCell>
                                <TableCell>ISBN</TableCell>
                                <TableCell>예약자</TableCell>
                            </TableRow>
                        </TableHeader>
                        {list.length >= 1 ? 
                            <TableBody>
                            {list.map((item, index) => {
                                return (
                                    <TableRow>
                                        <TableCell width={16.3}>{item?.status ? item?.status : "비치중"}</TableCell>
                                        <TableCell width={16.3}>{new Date(item?._creationTime).toLocaleDateString()}</TableCell>
                                        <TableCell width={16.3}>{item?.title}</TableCell>
                                        <TableCell width={16.3}>{item?.isbn}</TableCell>
                                        <TableCell width={16.3}>{item?.reservation ? item?.reservation : "(예약자 없음)"}</TableCell>
                                    </TableRow>
                                )
                            }) 
                            }
                            </TableBody>
                            :
                            <div className={st.no_data}>
                                No Data Found
                            </div>
                      }
                    </Table>

                <Pagination>
                    <PaginationContent onChange={(e) => {e.currentTarget.ariaValueText}}>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </Card>
        </div>
    )
}

export default BookList;
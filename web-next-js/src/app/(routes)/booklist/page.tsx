"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { Search, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { ChartCard } from "@/components/common/ChartCard";
import { Id } from '../../../../convex/_generated/dataModel';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import st from './BookList.module.scss';

function BookList() {
    const getBooks = useMutation(api.books.getBooks);
    const postApiTest = useMutation(api.books.borrowBook);
    const getUserBorrowed = useMutation(api.books.getUserBorrowed);
    const [bookCount, setBookCount] = useState<number>(0);
    const [reservedCount, setReservedCount] = useState<number>(0);
    const [borrowedCount, setBorrowedCount] = useState<number>(0);
    const [input, setInput] = useState<string>("");
    const [list, setList] = useState<any[]>([]);

    const router = useRouter();

    const handleBooks = () => {
        const bookPromise = getBooks().then(data => {
            setList(data.bookList);
            setBookCount(data?.totalCount!);
        });
        toast.promise(bookPromise, {
            loading: "Getting Books...",
            success: "Got Book List From Database!",
            error: "Oops, Something Went Wrong..."
        })
    }

    const handleBorrow = (bookId : string) => {
        getUserBorrowed({
            student_id : "60211579"
        }).then((data) => {
            if (data.totalBorrowed >= 5) {
                alert("대출 권수 초과입니다. 책 반납 후 다시 시도해주세요.");
            }
            else {
                const borrowPromise = postApiTest({
                    book_id: bookId as Id<"book_info">,
                    student_id: "60211579"
                })
        
                toast.promise(borrowPromise, {
                    loading: "Requesting to server...",
                    success: "Success! Book Borrowed!",
                    error: "Oops, Something Went Wrong..."
                })
            }
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
                    description={"동아리 총 도서 현황"}
                    countVal={bookCount}
                    chartInsideText={`총 ${bookCount}권 비치`}
                />
                <ChartCard
                    title={"총 예약 도서 수"}
                    description={"동아리 예약 도서 현황"}
                    maxVal={bookCount}
                    countVal={reservedCount}
                    chartInsideText={`${reservedCount}권이 예약중입니다.`}
                />
                <ChartCard
                    title={"총 대출 도서 수"}
                    description={"동아리 대출 도서 현황"}
                    maxVal={bookCount}
                    countVal={reservedCount}
                    chartInsideText={`${reservedCount}권이 대출중입니다.`}
                />
            </div>
            <Card className={st.filter}>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="상태" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="notBorrowed">비치중</SelectItem>
                        <SelectItem value="borrowed">대출중</SelectItem>
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
                    placeholder='Type ISBN or Book Title...'
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
                                <TableCell>분류</TableCell>
                                <TableCell>책 이름</TableCell>
                                <TableCell>ISBN</TableCell>
                                <TableCell>대출</TableCell>
                                <TableCell>예약자</TableCell>                                
                            </TableRow>
                        </TableHeader>
                        {list.length >= 1 ?
                            <TableBody>
                            { list.map((item) => {
                                return (
                                    <TableRow
                                        className={st.table_row}
                                        key={item?._id}
                                    >
                                        <TableCell width={16.3}>{item?.status ? item?.status : "비치중"}</TableCell>
                                        <TableCell width={16.3}>{new Date(item?._creationTime).toLocaleDateString()}</TableCell>
                                        <TableCell width={16.3}>{item?.type ? item?.type : ""}</TableCell>
                                        <TableCell 
                                            className={st.book_title}
                                            width={16.3}
                                            onClick={() => {
                                                router.push(`/booklist/${item?._id}`);
                                            }}
                                        >
                                            {item?.title}
                                        </TableCell>
                                        <TableCell width={16.3}>{item?.isbn}</TableCell>
                                        <TableCell 
                                            width={16.3}
                                            onClick={() => {
                                                handleBorrow(item?._id);
                                            }}
                                        >
                                            {item?.borrowed ? "대출중" : <Button>대출</Button>}
                                        </TableCell>
                                        <TableCell width={16.3}>{item?.reservation ? item?.reservation : <Button>예약</Button>}</TableCell>
                                    </TableRow>
                                )
                            }) 
                            }
                            </TableBody>

                            :

                            <span>No Data Found</span>
                        }
                    </Table>

                <Pagination>
                    <PaginationContent onChange={(e) => {e.currentTarget.ariaValueText}}>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        {   <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        }
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
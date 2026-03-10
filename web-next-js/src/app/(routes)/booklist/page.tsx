"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { Search, RotateCcw, Bookmark } from 'lucide-react';
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
    const borrowBook = useMutation(api.books.borrowBook);
    const reserveBook = useMutation(api.books.reserveBook);
    const getUserBorrowed = useMutation(api.books.getUserBorrowed);
    const getUserReserved = useMutation(api.books.getUserReserved);
    const returnBook = useMutation(api.books.returnBook);
    const cancelReservation = useMutation(api.books.cancelReservation);
    const addBookmark = useMutation(api.books.addBookmark);
    const cancelBookmark = useMutation(api.books.cancelBookmark);
    const getUserBookmark = useMutation(api.books.getUserBookmark);

    const [bookCount, setBookCount] = useState<number>(0);
    const [reservedCount, setReservedCount] = useState<number>(0);
    const [borrowedCount, setBorrowedCount] = useState<number>(0);
    const [searchType, setSearchType] = useState<string>("전체");
    const [input, setInput] = useState<string>("");
    const [bookList, setBookList] = useState<any[]>([]);
    const [bookmarkData, setBookmarkData] = useState<any[]>([]);
    const [borrowedFilter, setBorrowedFilter] = useState<string>("전체");
    const [reservedFilter, setReservedFilter] = useState<string>("all");
    const [pageCount, setPageCount] = useState<number>(1);

    const router = useRouter();

    const handleSearch = async () => {
        const searchPromise = getBooks().then((data) => {
            const reservedCount = data.bookList.filter((item) => {
                return item.reservation && item.reservation !== "";
            }).length;
    
            const borrowedCount = data.bookList.filter((item) => {
                return item.borrowed && item.borrowed !== "";
            }).length;

            setBookCount(data?.totalCount!);
            setReservedCount(reservedCount);
            setBorrowedCount(borrowedCount);

            return data.bookList;
        })
        .then((booklist) => {
            const searchResult = booklist.filter((item) => {
                return item?.title?.replace(" ", "").toLowerCase().includes(input.toLowerCase())
                    || item?.isbn?.replace(" ", "").toLowerCase().includes(input.toLowerCase())
                ;
            }).filter((item) => {
                if (searchType === "전체") {
                    return true;
                }
                else {
                    return item?.type?.includes(searchType);
                }
            }).filter((item) => {
                if (borrowedFilter === "전체") {
                    return true;
                }
                else {
                    return item.status?.includes(borrowedFilter);
                }
            }).filter((item) => {
                if (reservedFilter === "all") {
                    return true;
                }
                else if (reservedFilter === "reserved") {
                    return item.reservation && item.reservation !== ""
                }
                else {
                    return !item.reservation || item.reservation === ""
                }
            })

            return searchResult;
        }).then((data) => setBookList(data))

        toast.promise(searchPromise, {
            loading: "검색 중입니다...",
            success: "검색 목록을 가져왔습니다!",
            error: "앗, 무언가 잘못된 것 같군요..."
        })
    }

    const handleBooks = () => {
        const bookPromise = getBooks().then((data) => {
            const reservedCount = data.bookList.filter((item) => {
                return item.reservation && item.reservation !== "";
            }).length;

            const borrowedCount = data.bookList.filter((item) => {
                return item.borrowed && item.borrowed !== "";
            }).length;

            setBookList(data.bookList);
            setBookCount(data?.totalCount!);
            setReservedCount(reservedCount);
            setBorrowedCount(borrowedCount);
            setPageCount(data.totalPageNum);
        })
        .then(() => {
            getUserBookmark({
                student_id: "60211579"
            })
            .then((data) => {
                setBookmarkData(data.bookmarkList);
            })
        })

        toast.promise(bookPromise, {
            loading: "책 목록을 가져오는 중입니다...",
            success: "데이터베이스로부터 목록을 가져왔습니다!",
            error: "앗, 무언가 잘못된 것 같군요..."
        })
    }

    const handleBorrow = (bookId : string) => {
        getUserBorrowed({
            student_id : "60211579"
        })
        .then((data) => {
            if (data.totalBorrowed >= 5) {
                alert("대출 권수 초과입니다. 책 반납 후 다시 시도해주세요.");
            }
            else {
                const borrowPromise = borrowBook({
                    book_id: bookId as Id<"book_info">,
                    student_id: "60211579"
                })
        
                toast.promise(borrowPromise, {
                    loading: "서버에 요청중...",
                    success: "책 대출에 성공하였습니다!",
                    error: "앗, 무언가 잘못된 것 같군요..."
                })
            }
        })
        .then(() =>  handleBooks())
    }

    const handleReserve = (bookId : string) => {
        getUserReserved({
            student_id : "60211579"
        })
        .then((data) => {
            if (data.totalReserved >= 5) {
                alert("예약 권수 초과입니다. 책 대출 또는 예약 취소 후 예약을 다시 시도해주세요.");
            }
            else {
                const reservePromise = reserveBook({
                    book_id: bookId as Id<"book_info">,
                    student_id: "60211579"
                })
        
                toast.promise(reservePromise, {
                    loading: "서버에 요청중...",
                    success: "책 예약에 성공하였습니다",
                    error: "앗, 무언가 잘못된 것 같군요..."
                })
            }
        })
        .then(() => handleBooks())
    }

    const handleReturn = (bookId : string) => {
        const returnPromise = returnBook({
            book_id : bookId as Id<"book_info">, 
            student_id: "60211579"
        })
        .then(() => handleBooks())

        toast.promise(returnPromise, {
            loading: "반납 시도중...",
            success: "책을 반납하였습니다",
            error: "앗, 무언가 잘못된 것 같군요..."
        })
    }

    const handleCancelRes = (bookId : string) => {
        const cancelPromise = cancelReservation({
            book_id : bookId as Id<"book_info">,
            student_id: "60211579"
        })
        .then(() => handleBooks())

        toast.promise(cancelPromise, {
            loading: "예약 취소 시도중...",
            success: "책을 예약 취소하였습니다",
            error: "앗, 무언가 잘못된 것 같군요..."
        })
    }

    const handleBookmark = (bookId : string) => {
        getUserBookmark({
            student_id: "60211579"
        })
        .then((data) => {
            setBookmarkData(data.bookmarkList);
        })
        .then(() => {
            if(bookmarkData.filter((item) => {
                return item.book_id === bookId;
            })?.length >= 1) {
                cancelBookmark({
                    book_id: bookId as Id<"book_info">,
                    student_id: "60211579"
                })
            }
            else {
                const bookmarkPromise = addBookmark({
                    book_id: bookId as Id<"book_info">,
                    student_id: "60211579"
                })
        
                toast.promise(bookmarkPromise, {
                    loading: "북마크중...",
                    success: "북마크하였습니다",
                    error: "앗, 무언가 잘못된 것 같군요..."
                })
            }
        }).then(() => handleBooks());
    }

    const pagination = () => {
        let arr = []
        for (let i = 1; i <= pageCount; i++) {
            arr.push(
                <PaginationItem>
                    <PaginationLink href={`#${i}`}>{i}</PaginationLink>
                </PaginationItem>
            );
        }
        return arr;
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
                    countVal={borrowedCount}
                    chartInsideText={`${borrowedCount}권이 대출중입니다.`}
                />
            </div>
            <Card className={st.filter}>
                <Select
                    onValueChange={(value) => setBorrowedFilter(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue 
                            placeholder="대출 여부"
                            defaultValue="전체"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="전체">전체</SelectItem>
                        <SelectItem value="비치중">비치중</SelectItem>
                        <SelectItem value="대출중">대출중</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value) => setSearchType(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue 
                            placeholder="분류"
                            defaultValue="전체"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="전체">전체</SelectItem>
                        <SelectItem value="임베디드">임베디드</SelectItem>
                        <SelectItem value="교양">교양</SelectItem>
                        <SelectItem value="컴퓨터">컴퓨터</SelectItem>
                        <SelectItem value="반도체">반도체</SelectItem>
                        <SelectItem value="기계">기계</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value) => setReservedFilter(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue 
                            placeholder="예약 여부"
                            defaultValue="all"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
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
                    onClick={handleSearch}
                >
                    검색
                    <Search size={15}/>
                </Button>

                <Button
                    className={st.button}
                    onClick={handleBooks}
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
                                <TableCell align='center'>대출자</TableCell>
                                <TableCell align='center'>예약자</TableCell>
                                <TableCell align='center'>북마크</TableCell>            
                            </TableRow>
                        </TableHeader>
                        { bookList.length >= 1 ?
                            <TableBody>
                            { bookList.map((item) => {
                                return (
                                    <TableRow
                                        className={st.table_row}
                                        key={item?._id}
                                    >
                                        <TableCell width={12.5}>{item?.status ? item?.status : "비치중"}</TableCell>
                                        <TableCell width={12.5}>{new Date(item?._creationTime).toLocaleDateString()}</TableCell>
                                        <TableCell width={12.5}>{item?.type ? item?.type : ""}</TableCell>
                                        <TableCell 
                                            className={st.book_title}
                                            width={12.5}
                                            onClick={() => {
                                                router.push(`/booklist/${item?._id}`);
                                            }}
                                        >
                                            {item?.title}
                                        </TableCell>
                                        <TableCell width={12.5}>{item?.isbn}</TableCell>
                                        <TableCell width={12.5} align='center'>
                                            { item?.borrowed ? 

                                            item.borrowed === "60211579" ? <Button className={st.activated_button} onClick={() => handleReturn(item?._id)}>반납</Button> : `대출중 : ${item.borrowed}` 

                                            : 

                                            <Button
                                                className={st.default_button}
                                                onClick={() => {
                                                    handleBorrow(item?._id);
                                                }}
                                            >
                                                대출
                                            </Button>
                                            }
                                        </TableCell>
                                        <TableCell width={12.5} align='center'>
                                            { item?.reservation && item?.reservation !== "" ? 

                                            item.reservation === "60211579" ? <Button className={st.activated_button} onClick={() => handleCancelRes(item?._id)}>예약 취소</Button> : `예약중 : ${item.reservation}` 

                                            : 
                                            
                                            (item.borrowed !== "" && item.borrowed && item.borrowed !== "60211579")  &&

                                            <Button
                                                className={st.default_button}
                                                onClick={() => {
                                                    handleReserve(item?._id);
                                                }}
                                            >
                                                예약
                                            </Button>
                                            }
                                        </TableCell>

                                        <TableCell width={12.5} align='center'>
                                            <Button 
                                                className={st.default_button}
                                                onClick={() => handleBookmark(item?._id)}
                                            >
                                                <Bookmark size={20}/>
                                                {item?.bookmark_count ? item?.bookmark_count : 0}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>

                            :

                            <span>No Data Found</span>
                        }
                    </Table>

                <Pagination>
                    <PaginationContent 
                        onChange={(e) => {e.currentTarget.ariaValueText}}
                    >
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        {
                            pagination().map((page, i) => (page))
                        }
                        <PaginationItem>
                            <PaginationNext onClick={() => {}}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </Card>
        </div>
    )
}

export default BookList;
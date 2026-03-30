'use client';

import { useAction, useMutation } from "convex/react";
import st from "./BookInformation.module.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Book, Search } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRecoilValue } from "recoil";
import { userDataState } from "@/stores/userDataState";
import { Id } from "../../../../../convex/_generated/dataModel";

const book_info_data = [
    {
        title: "ISBN",
        key: "isbn"
    },
    {
        title: "저자",
        key: "author"
    },
    {
        title: "출판사",
        key: "publisher"
    },
    {
        title: "출판 일자",
        key: "pubdate"
    },
    {
        title: "책 정보",
        key: "description"
    }
]

export default function BookInformation(props : any) {
    const getBookInfo = useMutation(api.books.getBookInfo);
    const returnBook = useMutation(api.books.returnBook);
    const borrowBook = useMutation(api.books.borrowBook);
    const getUserBorrowed = useMutation(api.books.getUserBorrowed);
    const reserveBook = useMutation(api.books.reserveBook);
    const cancelReservation = useMutation(api.books.cancelReservation);
    const getUserReserved = useMutation(api.books.getUserReserved);
    const callBookApi = useAction(api.books.callNaverBookApi);

    const [bookData, setBookData] = useState<any>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [sentReq, setSentReq] = useState<boolean>(false);

    const userData = useRecoilValue(userDataState);

    const handleBorrow = (bookId : string) => {
        getUserBorrowed({
            student_id : userData.student_id
        })
        .then((data) => {
            if (data.totalBorrowed >= 5) {
                    alert("대출 권수 초과입니다. 책 반납 후 다시 시도해주세요.");
                    setSentReq(false);
                }
            else {
                const borrowPromise = borrowBook({
                    book_id: bookId as Id<"book_info">,
                    student_id: userData.student_id
                })
                    
                toast.promise(borrowPromise, {
                    loading: "서버에 요청중...",
                    success: "책 대출에 성공하였습니다!",
                    error: "앗, 무언가 잘못된 것 같군요..."
                })
            }
        })
        .then(() => {
            setSentReq(false);
        })
    }

    const searchFromApi = () => {
        const apiPromise = getBookInfo({ 
            book_id: props.params.id 
        }).then(async (data) => {
            setLoading(true);
            const searchList = await callBookApi({
                isbn : data.isbn,
            })

            if (searchList?.items[0]) {
                setBookData({
                    searchedData: {...searchList?.items[0]!},
                    book_title: data?.title,
                    borrowed : data?.borrowed,
                    reservation : data?.reservation,
                    status : data?.status,
                    bookmark_count : data?.bookmark_count
                });
            }
            else {
                setBookData({
                    book_title: data?.title,
                    borrowed : data?.borrowed,
                    reservation : data?.reservation,
                    status : data?.status,
                    bookmark_count : data?.bookmark_count
                });
            }
            
        }).then(() => setLoading(false));

        toast.promise(apiPromise, {
            loading: "정보를 가져오는 중...",
            success: "로딩 완료!",
            error: "앗, 무언가 잘못된 것 같군요..."
        })
    }

    const handleReturn = (bookId : string) => {
        const returnPromise = returnBook({
            book_id : bookId as Id<"book_info">, 
            student_id: userData.student_id
        })
        .then(() => {
            setSentReq(false);
        })
    
        toast.promise(returnPromise, {
            loading: "반납 시도중...",
            success: "책을 반납하였습니다",
            error: "앗, 무언가 잘못된 것 같군요..."
        })
    }

    const handleReserve = (bookId : string) => {
            getUserReserved({
                student_id : userData.student_id
            })
            .then((data) => {
                if (data.totalReserved >= 5) {
                    alert("예약 권수 초과입니다. 책 대출 또는 예약 취소 후 예약을 다시 시도해주세요.");
                }
                else {
                    const reservePromise = reserveBook({
                        book_id: bookId as Id<"book_info">,
                        student_id: userData.student_id
                    })
            
                    toast.promise(reservePromise, {
                        loading: "서버에 요청중...",
                        success: "책 예약에 성공하였습니다",
                        error: "앗, 무언가 잘못된 것 같군요..."
                    })
                }
            })
            .then(() => setSentReq(false))
        }

    const handleCancelRes = (bookId : string) => {
            const cancelPromise = cancelReservation({
                book_id : bookId as Id<"book_info">,
                student_id: userData.student_id
            })
            .then(() => setSentReq(false))
    
            toast.promise(cancelPromise, {
                loading: "예약 취소 시도중...",
                success: "책을 예약 취소하였습니다",
                error: "앗, 무언가 잘못된 것 같군요..."
            })
        }

    useEffect(() => {
        searchFromApi();
    }, [sentReq]);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className={st.page_container}>

             <span className={st.title}>
                <Book className={st.icon}/>
                <span>'{bookData?.book_title}'에 대한 정보</span>
            </span>
            
            <div className={st.header}>
                {bookData.searchedData === undefined ? 
                <div className={st.undefined}>
                    API로 검색된 책 정보가 없습니다
                </div>
                :
                <div className={st.header_main}>
                    <div className={st.book_image_container}>
                        <div 
                            className={st.book_image_area} 
                            onClick={() => window.open(bookData?.searchedData.link ? bookData?.searchedData.link : "")}
                        >
                            <img
                                src={bookData?.searchedData.image} 
                                alt="book_image" 
                            />

                            <div
                                className={st.search_cover}
                            >
                                <Search className={st.icon}/>
                            </div>
                        </div>
                    </div>

                    <div
                        className={st.book_info}
                    >
                        {book_info_data.map((item, index) => {
                            return (
                                <div className={st.book_section}>
                                    <span>{item.title}</span>
                                    <span>{bookData?.searchedData[item.key]!}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                }

                <div className={st.button_area}>
                    {bookData?.borrowed === userData.student_id ? 
                            <Button
                                className={st.activated_button} 
                                disabled={sentReq}
                                onClick={() => {
                                    setSentReq(true);
                                    handleReturn(props.params.id);
                                }}
                            >
                                반납하기
                            </Button>

                            : 

                            <Button
                                className={st.default_button}
                                disabled={sentReq || (bookData.borrowed !== "" && bookData.borrowed !== undefined)}
                                onClick={() => {
                                    setSentReq(true);
                                    handleBorrow(props.params.id);
                                }}
                            >
                                대출하기
                            </Button>
                    }

                    {bookData?.reservation === userData.student_id ? 
                            <Button
                                className={st.activated_button} 
                                disabled={sentReq}
                                onClick={() => {
                                    setSentReq(true);
                                    handleCancelRes(props.params.id);
                                }}
                            >
                                예약 취소
                            </Button>

                            : 

                            <Button
                                className={st.default_button}
                                disabled={sentReq || (bookData.reservation !== "" && bookData.reservation !== undefined)}
                                onClick={() => {
                                    setSentReq(true);
                                    handleReserve(props.params.id);
                                }}
                            >
                                예약하기
                            </Button>
                    }
                </div>
            </div>

            <div
                className={st.card_group}
            >
                <Card className={st.status_card}>
                    <CardHeader>
                        <CardTitle>비치 여부</CardTitle>
                        <CardDescription>현재 책 비치 여부입니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={st.status_content}>{bookData?.status}</p>
                    </CardContent>
                </Card>

                <Card className={st.status_card}>
                    <CardHeader>
                        <CardTitle>북마크 수</CardTitle>
                        <CardDescription>현재 북마크 수입니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={st.status_content}>{bookData?.bookmark_count}</p>
                    </CardContent>
                </Card>

                <Card className={st.status_card}>
                    <CardHeader>
                        <CardTitle>대출자</CardTitle>
                        <CardDescription>현재 책을 대출중인 사람입니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={st.status_content}>{bookData?.borrowed ? bookData?.borrowed : "-"}</p>
                    </CardContent>
                </Card>

                <Card className={st.status_card}>
                    <CardHeader>
                        <CardTitle>예약자</CardTitle>
                        <CardDescription>현재 책을 예약중인 사람입니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={st.status_content}>{bookData?.reservation ? bookData?.reservation : "-"}</p>
                    </CardContent>
                </Card>
            </div>
            
        </div>
    )
}
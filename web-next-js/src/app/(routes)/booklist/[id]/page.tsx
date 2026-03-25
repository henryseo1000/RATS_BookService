'use client';

import { useAction, useMutation } from "convex/react";
import st from "./BookInformation.module.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Book, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loading from "@/app/loading";

export default function BookInformation(props : any) {
    const getBookInfo = useMutation(api.books.getBookInfo);
    const callBookApi = useAction(api.books.callNaverBookApi);

    const [bookData, setBookData] = useState<any>();
    const [isLoading, setLoading] = useState<boolean>(true);

    const searchFromApi = () => {
        const apiPromise = getBookInfo({ 
            book_id: props.params.id 
        }).then( async (data) => {
            setLoading(true);
            const searchList = await callBookApi({
                isbn : data.isbn
            })

            setBookData(searchList?.items[0]!);
        }).then(() => setLoading(false))

        toast.promise(apiPromise, {
            loading: "정보를 가져오는 중...",
            success: "로딩 완료!",
            error: "앗, 무언가 잘못된 것 같군요..."
        })
    }

    useEffect(() => {
        searchFromApi()

    }, []);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className={st.page_container}>
            {bookData !== undefined &&
                <span className={st.title}>
                    <Book/>
                    {bookData?.title}
                    에 대한 정보
                </span>
            }
            
            <div className={st.header}>
                {bookData === undefined ? 
                <div>
                    책 정보가 없습니다.
                </div>
                :
                <>
                <div className={st.book_image_container}>
                    
                    <div
                        className={st.search_cover}
                    >
                        <Search/>
                    </div>

                    <img
                        src={bookData?.image} 
                        alt="book_image" 
                        onClick={() => window.open(bookData.link ? bookData.link : "")}
                    />
                </div>

                <div
                    className={st.book_info}
                >
                    <span>ISBN : {bookData?.isbn}</span>
                    <span>저자 : {bookData?.author}</span>
                    <span>출판사 : {bookData?.publisher}</span>
                    <span>출판 일자 : {bookData?.pubdate}</span>
                    <span>책 정보 : {bookData?.description}</span>
                </div>
                </>
                }
            </div>

            <div
                className={st.button_group}
            >
                <Button/>
                <Button/>
                <Button/>
            </div>
            
        </div>
    )
}
'use client';

import { useAction, useMutation } from "convex/react";
import st from "./BookInformation.module.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookInformation(props : any) {
    const getBookInfo = useMutation(api.books.getBookInfo);
    const callBookApi = useAction(api.books.callNaverBookApi);

    const [bookData, setBookData] = useState<any>();

    useEffect(() => {
        getBookInfo({ 
            book_id: props.params.id 
        }).then( async (data) => {
            const searchList = await callBookApi({
                isbn : data.isbn
            })

            setBookData(searchList?.items[0]!);
        })
    }, []);

    return (
        <div className={st.page_container}>
            <span className={st.title}>
                <Book/>
                {bookData?.title}
                에 대한 정보
            </span>

            <div className={st.header}>
                <img 
                    src={bookData?.image} 
                    alt="book_image" 
                    onClick={() => window.open(bookData.link ? bookData.link : "")}
                />

                <div
                    className={st.book_info}
                >
                    <span>ISBN : {bookData?.isbn}</span>
                    <span>저자 : {bookData?.author}</span>
                    <span>출판사 : {bookData?.publisher}</span>
                    <span>출판 일자 : {bookData?.pubdate}</span>
                    <span>책 정보 : {bookData?.description}</span>
                </div>
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
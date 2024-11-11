'use client';

import axios from 'axios';
import { useMutation } from "convex/react";
import st from "./BookInformation.module.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";


export default function BookInformation(props : any) {
    const getBookInfo = useMutation(api.books.getBookInfo);

    const [title, setTitle] = useState<string>("");

    const CLINET_ID = process.env.NEXT_PUBLIC_API_KEY_NAVER_ID;
    const CLINET_PW = process.env.NEXT_PUBLIC_API_KEY_NAVER_PW;

    useEffect(() => {
        getBookInfo({ 
            book_id: props.params.id 
        }).then( async (data) => {
            const apiData = await axios.get(`https://openapi.naver.com/v1/search/book_adv.json?${data.title ? `d_titl=${data.title}` : ""}${data.isbn ? `&d_isbn=${data.isbn}` : ""}`, {
                method: "GET",
                params: {
                    d_titl: "hello"
                },
                headers: {
                    "Accept": "*/*",
                    "X-Naver-Client-Id": CLINET_ID,
                    "X-Naver-Client-Secret": CLINET_PW,
                }
            })

            return apiData;
        })
        .then((data) => {
            console.log(data);
        })
    }, []);

    return (
        <div className={st.page_container}>
            <div className={st.header}>
                {title}
                <img src="" alt="" />

                <div>
                
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}
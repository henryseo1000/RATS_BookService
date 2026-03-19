import React from 'react';
import { ChevronRight } from 'lucide-react';

import { Card } from '../ui/card'

import st from "./BookCard.module.scss";

interface Props {
    data: any;
}

function BookCard({ data } : Props) {

    return (
        <Card className={st.card_container}>
            <img 
                src={data?.cover} 
                alt="book_img" 
            />
            <div className={st.content}>
                <div className={st.inform_area}>
                    <span>{data?.title}</span>
                    <p>
                        {data?.description ? data?.description : "설명이 없는 책입니다."}
                    </p>
                </div>

                <ChevronRight 
                    className={st.arrow}
                    size={40}
                    color='#b0b0b0'
                    onClick={() => {
                        window.open(data?.link)
                    }}
                />
            </div>
        </Card>
    )
}

export default BookCard;
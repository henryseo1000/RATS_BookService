import React from 'react'
import { Card } from '../ui/card'
import { BookData } from '@/types/common/BookData';

import st from "./BookCard.module.scss";

interface Props {
    data: BookData;
}

function BookCard({ data } : Props) {
    return (
        <Card className={st.card_container}>
            <img 

                src={data.imgPath} 
                alt="book_img" 
            />
            <div>
                <span>{data.title}</span>
                <span>
                    {data.description}
                </span>
            </div>
        </Card>
    )
}

export default BookCard
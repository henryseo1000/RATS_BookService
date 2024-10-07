import React from 'react';
import { ChevronRight } from 'lucide-react';

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
            <div className={st.content}>
                <div>
                    <span>{data.title}</span>
                    <p>
                        {data.description}
                    </p>
                </div>

                <ChevronRight 
                    className={st.arrow}
                    size={40} 
                    color='#b0b0b0'
                    onClick={() => {

                    }}
                />
            </div>
        </Card>
    )
}

export default BookCard;
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import pathToTitle from '@/utils/pathToTitle';
import { Search, BookOpenText } from 'lucide-react';
import { Button } from '../ui/button';

import st from './SearchBar.module.scss';

function SearchBar() {
    const router = useRouter();
    const [input, setInput] = useState<string>('');
    const pathname = usePathname();
    const inputRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLDivElement>(null);

    const onEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            linkRef.current.click();
        }
    }

    useEffect(() => {
        console.log(pathname)
        setInput("");
    }, [pathname])

    return (
        <div className={st.search_container}>
            <span>{pathToTitle(pathname.split('/')[1])}</span>

            { !(pathname === '/booklist') && 
            <div className={st.bar_menu}>
                <Button 
                    className={st.button}
                    onClick={() => {
                        router.push('/booklist');
                    }}
                >
                    도서 목록 조회하기
                    <BookOpenText size={15}/>
                </Button>

                <div className={st.input_area}>
                    <div
                        ref={linkRef}
                        className={st.link}
                        onClick={() => {
                            router.replace(`/booklist?searchInput=${input}`)
                        }}
                        
                    >
                        <Search/>
                    </div>
                        

                    <input
                        onKeyUp={onEnter}
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                        placeholder='Search For Book Name, ISBN...'
                        ref={inputRef}
                    />
                </div>
            </div>
        }
        </div>
    )
}

export default SearchBar;